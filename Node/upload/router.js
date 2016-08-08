var url = require("url");

function route(req, handlers, res) {
    var pathname = url.parse(req.url).pathname;
    if(typeof handlers[pathname] == "function") {
        handlers[pathname](req, res);
    }else {
        console.log("No request handler is found for: " + pathname);

        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 not found!");
        res.end();
    }
}

exports.route = route;