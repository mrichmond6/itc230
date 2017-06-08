var credentials=require('../lib/credentials.js');
var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title: String,
	author: String,
	
});
// remote db settings 
var options = { 
	server: { 
		socketOptions: { 
			keepAlive: 1, connectTimeoutMS: 30000 
		}  
	} 
};
mongoose.connect(credentials.mongo.development.connectionString, options);


var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error!')); 


var bookSchema = mongoose.Schema({
    id: Number,
    title: String,
	author: String,
}); 

module.exports = mongoose.model('Book', bookSchema); 