var mongoose = require('mongoose');

var bookInStockListenerSchema = mongoose.Schema({
	email: String;
	skus: [String];
})