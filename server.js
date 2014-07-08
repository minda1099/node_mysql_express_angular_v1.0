	var express = require('express'),
		http    = require('http'),
		path    = require('path'),
		mysql   = require('mysql'),
	 dbconfig   = require('./dbconfigure.js');
	 
	 var port = process.env.PORT || 8080;
 
	var connection = mysql.createConnection
	({
		host:'localhost',
		user:'root',
		password:'root'
	});
	
	connection.connect(function(err)
	{
		if(err) return console.log(err);
		dbconfig.setupDB(connection);
	});
	
	var app = express();
	
	app.configure(function()
	{
		app.use(express.static(__dirname + '/public'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
	});
	
	app.configure('development', function()
	{
		app.use(express.errorHandler());
	});
	
	app.post('/user', function(req, res) 
	{
		var form = req.body;
		var user = {username:req.body.username, useremail: req.body.useremail, password: req.body.password};
		
		dbconfig.addUserData(user, function(err, info)
		{
			if(err) console.log("Somthing Went Wrong :"+ err);
			user.id = info.insertId;
			res.json(user);
		});
	});
		
	app.listen(port);
	console.log("Listening on Port :"+port);
