var http = require("http");
var router = require("./router");

function start(handlers) {
    function onRequest(req, res) {
        router.route(req, handlers, res);
    }
    http.createServer(onRequest).listen(7878);
    console.log("server has started!");  
}

exports.start = start;
