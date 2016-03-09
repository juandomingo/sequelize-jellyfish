var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var controller = require('./controller.js');
var siofu = require("socketio-file-upload");

app.set('view engine', 'ejs');
app.use(bodyParser.json({ extended: true }));
app.use('public',express.static('/public'));
app.use(siofu.router);
var db = require('./mysqlhandler.js');

app.use(bodyParser()); // get information from html forms


/*
  SOCKET IO
*/

var _defaultdir = "./files/";
var handleClient = function(socket){
	var uploader = new siofu();
	
    
    uploader.listen(socket);
    uploader.on("start",function(event){


		var dir = _defaultdir + event.file.meta.hash;

		if (!fs.existsSync(dir)){
    		fs.mkdirSync(dir);
		}

    	console.log("asdasdasd");
    	uploader.dir = _defaultdir + event.file.meta.hash;
    	console.log(uploader.dir),
    	console.log(event.file.meta.hash);


    });
    
    uploader.on("saved",function(event){

    	db.saveFile(event.file);
    });
}
io.sockets.on('connection', handleClient);


/*
  SERVER RESPONSE
*/


// show the home page (will also have our login links)
app.get('/', function(req, res) {
	res.render('index.ejs');
});


app.get(/\/\w+\@\w+/, function(req, res) {
	res.render('index.ejs');
});

server.listen(3000, function(){
  	console.log("Listen on port 80\n");
});
