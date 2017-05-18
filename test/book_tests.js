var expect=require("chai").expect;
var book = require('../book.js');

//search page tests
describe("Books", ()=>{
	it("returns requested book",()=>{
		var result=book.get("Harry");
		expect(result).to.deep.equal({
		title: "Harry", author: "JK Rowling"
	  	});
	});		

	it("get fails w/ invalid book", ()=>{
		var result=book.get('troll');
		expect(result).to.be.undefined;
	});
	
	//add page tests

	it("adds requested book information", () => {
		var newBook = {
			title: "Cursed", author: "JK Rowling"};
		var result = book.add(newBook);
		expect(result).to.deep.equal({
			"added": true, "total": 8});
	});
	
	it("add fails", ()=>{
		var result = book.add({
			title: "Potter"
		});
		expect(result.added).to.be.false;
	});
	
	//delete page tests
	it("deletes book information", ()=>
	   {
	   var result = book.delete("Harry");
	expect(result).to.deep.equal({
		"deleted":true, "total": 7
	});
});
	
	it("unable to delete book", () =>{
	var result=book.delete("hermione");
	expect(result).to.deep.equal({
		"deleted": false, "total": 7
	});
});
});



//delete page tests