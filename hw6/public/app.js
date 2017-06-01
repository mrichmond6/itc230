'use strict'

var book = require('./models/book-model.js');
/*console.log(book.get("Harry"));)*/
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var app = new express();
/*mongoose connection*/
var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions:{
			keepAlive:1 //prevents db connection errors for long running apps
		}
	}
};
/**/
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));//this will allow direct nav to static files
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.listen(app.get('port'), function(){
    console.log('Express Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate the connection.' );
});