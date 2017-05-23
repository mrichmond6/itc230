'use strict'

var books = [
    { 
        title: "Harry", author: "JK Rowling"
    },
    { 
        title: "Potter", author: "JK Rowling"
    },
    { 
        title: "Prisoner", author: "JK Rowling"
    },
    { 
        title: "Goblet", author: "JK Rowling"
    }, 
    { 
        title: "Pheonix", author: "JK Rowling"
    },
    { 
        title: "Prince", author: "JK Rowling"
    },
    { 
        title: "Hallows", author: "JK Rowling"
    },
    ]

exports.get = (title)  => {
    return books.find((item) => {
        return item.title == title;
    });
};


exports.getAll = () => {
	return books;
}

exports.delete = (title) => {
	let oldLength = books.length;
    let newBooks = books.filter((item) => {
        return item.title !== title;
    });
    books = newBooks;
	return {deleted: oldLength != books.length , total: books.length }
};

exports.add = (newBook) =>{
	// check if in the array, if it is say "sorry, that book is already in our records"
	//if not, say "would you like to add this book to our records"
	let oldLength = books.length;//oldLength is book length before we add or delete
	var found = this.get(newBook.title);
	if (!found) {
		books.push(newBook);
	}
	return {
		added: oldLength != books.length , total: books.length
	}
	
}
