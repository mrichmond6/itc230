var Book = require("./models/book-model");

// insert a new document into the database
new Book({
	title:"Harry", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Potter", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Prisoner", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Goblet", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Prince", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Hallows", 
	author:"JK Rowling",
}).save();

Book.count((err, result)=>{
    console.log(result);
});

// find all documents 
Book.find((err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});
