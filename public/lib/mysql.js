//Update this to use mysql
   angular.module('mysql', ['ngResource']).
    factory('SignUpUser', function ($resource) {
        var SignUpUser = $resource('/user1', {}, {update:{method:'PUT'}});

        return SignUpUser;
    });
	
    angular.module('logmysql',['ngResource']).
    factory('LoginUser', function($resource) {
	  var LoginUser = $resource('/getuser',{},{update:{method:'PUT'}});

	return LoginUser;
     });
