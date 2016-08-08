var fs = require("fs");
var formidable = require("formidable");

//一开始页面显示的表单
function start(req, res) {
    console.log("Handler start is called!");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    res.writeHead(404, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
}
//处理上传的图片
function upload(req, res) {
    console.log("Handler upload is called!");

    var form = new formidable.IncomingForm();
    form.uploadDir = "./tmp";
    form.parse(req, function(err, fields, files) {
        console.log("upload file path: " + files.upload.path);
        fs.renameSync(files.upload.path, "./tmp/test.png");
        res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});//设置charset是为了保证中
                                                                        // 文正常显示
        res.write("上传的图片: <br/>");
        res.write("<img src='/show'>");
        res.end();
    });
}
//显示上传的图片
function show(req, res) {
    console.log("Handler show is called!");

    fs.readFile("./tmp/test.png", function(err, file) {
        if(err) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("读取图片失败！\n" + err);
            res.end();
        }else {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(file, "binary");
            res.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;