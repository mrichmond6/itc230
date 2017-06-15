var Book = require("./models/book-model");

// insert a new document into the database
new Book({
	title:"Harry Potter and the Philosopher's Stone", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Harry Potter and the Chamber of Secrets", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Harry Potter and the Prisoner of Azkaban", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Harry Potter and the Goblet of Fire", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Harry Potter and the Order of the Pheonix", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Harry Potter and the Half-blood Prince", 
	author:"JK Rowling",
}).save();
new Book({
	title:"Harry Potter and the Deathly Hallows", 
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
