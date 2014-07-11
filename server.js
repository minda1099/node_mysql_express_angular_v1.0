	var express = require('express'),
		mysql   = require('mysql'),
		path = require('path'),
	 dbconfig   = require('./dbconfigure.js');
	 
	 var port = process.env.PORT || 9000;
 
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
		app.use(express.static(__dirname+'/public'));
		app.use(express.json());
		app.use(express.urlencoded());
		app.use(express.methodOverride());
	});
	
	if ('development' == app.get('env')) 
	{
		app.configure('development', function()	
		{
			app.use(express.errorHandler());
		});
	//	console.log(app.get('env'));
    }
			
	app.post('/user1', function(req, res) 
	{
		var form = req.body;
		var user = {username:form.username, useremail: form.useremail, password: form.password};
		
		dbconfig.addUserData(user, function(err, info)
		{
			if(err) console.log("Something Went Wrong :"+ err);
			user.id = info.insertId;
			res.json(user);
		});
	});
	
	app.all('/getuser', function(req,res)
	{
		var logdata = {logemail:req.body.logemail, logpass:req.body.logpass};
		console.log("Request User Data :"+ logdata.logemail+" OR "+ req.body.logemail);
		
		dbconfig.getUserData(req.body.logemail, req.body.logpass, function(err,rows) 
		{
			//console.log("My Query Data: "+rows);
			
			if(err)
				return res.json(err);
			else 
				return res.json(rows);
		});		 
	});
			
	app.listen(port);
	console.log("Listening on Port :"+port);
