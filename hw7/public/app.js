'use strict'

var book = require('./models/book-model.js');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var app = express();
/*mongoose connection*/
var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions:{
			keepAlive:1 //prevents db connection errors for long running apps
		}
	}
};
// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err);
});

//set handebars as the templating engine??
var viewsPath = __dirname + '/views';
var hbs = handlebars.create({
	defaultLayout: 'main', 
	layoutsDir: viewsPath + '/layouts',
	extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('views', viewsPath);
app.set('view engine', 'hbs');

////ROUTES////
app.get('/', (req,res) => {
    book.find((err,books) =>{
	if (err) return next(err);
    res.render('home', {
		books: books
		});
	})
});

////ABOUT////
app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('About');
});
////GET////
app.get('/search', (req, res, next) =>{
	book.findOne({
		title:req.query.title}, (err, book)=>{
				 if(err) return next(err);
	res.type('text/html');
	res.render('details', {
		result: book
		});
	 });
});
////POST////
app.post('/search', (req,res,next) => {
	book.findOne({
		title:req.body.title},
		(err,book) =>{
		if (err) return next(err);
		res.type('text/html');
		res.render('details', {
			result: book
		});
	});
});


////GET////
app.get('/delete', (req,res) => {
	book.remove({
		title:req.query.title
	}, (err, result) => {
		let deleted = result.result.n !== 0; //n is 0 if no items deleted
		book.count((err, total) => {
			res.type('text/html');
			res.render('delete', {
				title: req.query.title, deleted: result.result.n !==0, total: total
			});
		});
	});
});


////404 page////
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

////500 page////
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

////api's////
app.get('/api/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    book.findOne({
		title: title
	}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/books', (req,res, next) => {
    book.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/delete/:title', (req,res, next) => {
    book.remove({"title":req.params.title }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

app.get('/api/add/:title/:author/:pubdate', (req,res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    book.update({ title: title}, {title:title, author: req.params.author, pubdate: req.params.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
    console.log('Express Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate the connection.' );
});