function start(){
    console.log("Request handler 'start' was called");
    return "hello start";
}

function about(){
    console.log("Request handler 'upload' was called");
    return "hello about";
}

exports.start=start;
exports.about=about;