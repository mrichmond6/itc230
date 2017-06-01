var Book = require("./models/book-model");

// insert a new document into the database
new Book({
	id: 1,
	title:"Harry", 
	author:"JK Rowling",
}).save();
new Book({
	id: 2,
	title:"Potter", 
	author:"JK Rowling",
}).save();
new Book({
	id: 3,
	title:"Prisoner", 
	author:"JK Rowling",
}).save();
new Book({
	id: 4,
	title:"Goblet", 
	author:"JK Rowling",
}).save();
new Book({
	id: 5,
	title:"Prince", 
	author:"JK Rowling",
}).save();
new Book({
	id: 6,
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
