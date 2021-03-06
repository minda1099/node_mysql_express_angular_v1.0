var connection;

exports.setupDB = function(conn) 
{
	connection = conn;
	
	if(!process.env.VCAP_SERVICES)
	{
		connection.query("CREATE DATABASE IF NOT EXISTS MyNodeData;", function(err)	{
			if(err) return console.log(err);
		});
		
		connection.query("Use MyNodeData;", function(err) {
			if(err) return console.log(err);
		});
	}
		
	connection.query('CREATE TABLE IF NOT EXISTS signusers'+
	                 '(usrid int(50) primary key not null auto_increment,'+
					 'usrname varchar(50) not null,'+
					 'usremail varchar(100) not null,'+
					 'pswd varchar(50) not null);',
					 function(err) {
						if (err) return console.log(err);
					});
};

exports.addUserData = function(data, callback)
{
	connection.query("INSERT INTO signusers(usrname,usremail,pswd) VALUES (?,?,?)",[data.username,data.useremail,data.password], callback);
};

exports.getUserData = function(logemail,logpass, callback)
{
	connection.query("SELECT usremail, pswd from signusers where usremail=? and pswd=?",[logemail,logpass], function(err,result) {
		
		if (err) 
            callback(err,null);
        else
            callback(null,result[0]);
	});
}
