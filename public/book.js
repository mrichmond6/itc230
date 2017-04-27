'use strict'

let books = [
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
    let newBooks = book.filter((item) => {
        return item.title !== title;
    });
    };