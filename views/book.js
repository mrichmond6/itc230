'use strict'

var books = [
    { 
        title: "Harry"
    },
    { 
        title: "Potter"
    },
    { 
        title: "Prisoner"
    },
    { 
        title: "Goblet"
    }, 
    { 
        title: "Pheonix"
    },
    { 
        title: "Prince"
    },
    { 
        title: "Hallows"
    },
    ]

exports.get = (title)  => {
    return books.find((item) => {
        return item.title == title;
    });
};

exports.delete = (title) => {
    console.log(books);
    let newBooks = books.filter((item) => {
        return item.title !== title;
    });
    books = newBooks;
    return books.length;
};