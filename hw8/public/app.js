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
/*var viewsPath = __dirname + '/views';
var hbs = handlebars.create({
	defaultLayout: 'main', 
	layoutsDir: viewsPath + '/layouts',
	extname: '.hbs'
});*/

app.engine(".html", handlebars({
	extname: '.html', defaultLayout: 'main'
}));
app.set("view engine", ".html");

/*app.engine('hbs', hbs.engine);
app.set('views', viewsPath);
app.set('view engine', 'hbs');*/

////ROUTES////

app.get('/', (req,res) => {
    book.find((err,books) => {
        if (err) return next(err);
        res.render('home', {books: JSON.stringify(books)});    
    })
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

// api's
app.get('/api/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    book.findOne({title: title}, (err, result) => {
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

app.post('/api/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body.title) { // insert new document
        let book = new book({title:req.body.title,author:req.body.author,pubdate:req.body.pubdate});
        book.save((err,newbook) => {
            if (err) return next(err);
            console.log(newbook)
            res.json({updated: 0, _id: newbook._id});
        });
    } else { // update existing document
        book.updateOne({ title: req.body.title}, {title:req.body.title, author: req.body.author}, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, title: req.body.title});
        });
    }
});

app.get('/api/add/:title/:author', (req,res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    book.update({ title: title}, {title:title, author: req.params.author}, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
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

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function(){
    console.log('Express Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate the connection.' );
});