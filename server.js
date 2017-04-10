var http = require("http");
var url = require("url");
var fs = require("fs");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + " received.");

        if (request.url === "/") {
            fs.readFile("public/home.html", function(err, data) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(data);
                response.end();
            });
        } else if (request.url === "/about"){
            fs.readFile("package.json", function(err, data) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(data);
                response.end();
            });
            
        }else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write("404 page not found");
            response.end();
        }
    }

    http.createServer(onRequest).listen(3000);
    console.log("Server has started.");
}

exports.start = start;