module.exports = function() {

	var mysqlhandler = require("./mysqlhandler.js");
	function getFilesInHash(hash,callback)
	{
		var files = mysqlhandler.getFilesInHash(hash, function(files){
			callback(files);
		});
	}

	var controller = {
	  "getFilesInHash" : getFilesInHash
	  
	}

	return controller;
}();
