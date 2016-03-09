module.exports = function() {


		var Sequelize = require('sequelize');
		var sequelize = new Sequelize('db2', 'db2', 'db2', {
		  host: 'localhost',
		  dialect: 'mysql',

		  pool: {
			max: 5,
			min: 0,
			idle: 10000
		  },

		});
		
			var File = sequelize.define('file', {
				fileName: {
					type: Sequelize.STRING,
					field: 'file_name' // Will result in an attribute that is firstName when user facing but first_name in the database
				},
				hashName: {
					type: Sequelize.STRING,
					field: 'hash_name'
				},
				description: {
					type: Sequelize.STRING,
					field: 'description'
				},
				filePath: {
					type: Sequelize.STRING,
					field: 'file_path'
				}
			}, {
				freezeTableName: true // Model tableName will be the same as the model name
			});
		
		//User.findOne().then(function(user){ console.log(user.firstName); });




		

	var saveFile = function(file){

		File.sync().then(function () {
		  // Table created
		  return File.create({
			fileName: file.base,
			hashName: file.meta.hash,
			description: file.meta.description,
			filePath: file.pathName
		  });
		}).then(function (file) {
    		console.log(file.firstName);
		});
		
	}

	var handler = {
	  "saveFile" : function(file){saveFile(file);}
	}

	return handler;
}();
