module.exports = function() {

	var test = function(){
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

		var User = sequelize.define('user', {
			firstName: {
			type: Sequelize.STRING,
			field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
		},
		lastName: {
			type: Sequelize.STRING
		}
		}, {
			freezeTableName: true // Model tableName will be the same as the model name
		});
/*
		User.sync({force: true}).then(function () {
		  // Table created
		  return User.create({
			firstName: 'John',
			lastName: 'Hancock'
		  });
		}).then(function (user) {
    		console.log(user.firstName);
		});*/

		User.findOne().then(function(user){ console.log(user.firstName); });




	}	

	var handler = {
	  "test" : function(callback){test();}
	}

	return handler;
}();
