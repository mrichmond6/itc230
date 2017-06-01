"use strict";

module.exports = function(app) {
    var books = require("../models/book-model"); 
    var path = require('path'); 
}

var express = require("express");
var app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

// set template engine
var viewsPath = __dirname + '/views';  
var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.html', layoutsDir: viewsPath + '/layouts',  
  partialsDir: viewsPath + '/partials' });
app.engine('html', handlebars.engine);
app.set('views', viewsPath );
app.set('view engine', 'html' );



// UI Routes! 

// Handlebars version

app.get('/old', function(req,res){
    books.find(function (err, books){
        if (err) return next(err); 
        if (!books) return next(); 
        res.type('text/html'); 
        res.render('home', {books: books} ); 
    }); 
}); 




// Need this on the bottom, to make sure that the server is listening for the app. 

app.listen(app.get('port'), function() {
    console.log('Express started; hit Ctrl+C to terminate.');    
});