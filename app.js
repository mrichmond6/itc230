var book = require('./book.js');
/*console.log(book.get("Harry"));)*/
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = new express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));//this will allow direct nav to static files
app.use(bodyParser.urlencoded({
    extended: true
}));

//set handebars as the templating engine??
var viewsPath = __dirname + '/public/views';
var hbs = handlebars.create({
	defaultLayout: 'main', 
	layoutsDir: viewsPath + '/layouts',
	extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('views', viewsPath);
app.set('view engine', 'hbs');


////ROUTES////
app.get('/', function(req, res){
    res.setHeader('Content-Type','text/html');
    res.render('home', {title: 'Main', books: book.getAll()});
});

////send a plain text response for ABOUT ////
app.get('/about', function(req, res){
    res.type('text/html');
    res.render('About');
});
//handle post
app.get('/search', function(req,res){
	var found = book.get(req.query.title);
	res.render('details', {title: req.query.title, result: found});
});

app.post('/search', function(req,res){
    var found = book.get(req.body.title);
	//console.log(found);
    res.render('details', {title: req.body.title, result: found});
});


//handle get
app.post('/delete', function(req, res){
	console.log(req.query);
    let result = book.delete(req.query.title); //delete the book object
    res.render('delete',{
        title: req.query.title, result: result
    });
});


//404 page
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log('Express Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate the connection.' );
});