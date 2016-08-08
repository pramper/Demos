var server = require("./server");
var reqHandler = require("./reqHandler");

var handlers = {};
handlers["/"] = reqHandler.start;
handlers["/start"] = reqHandler.start;
handlers["/show"] = reqHandler.show;
handlers["/upload"] = reqHandler.upload;

server.start(handlers);