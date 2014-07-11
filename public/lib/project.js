

var gimme = angular.module('gimme',['mysql','logmysql']);
	
	gimme.config(['$routeProvider',function($routeProvider) 
	{
		$routeProvider.when('/',
		{
			controller: 'mainCtrl',
			templateUrl: 'signup.html'
			
		}).
		when('/logpg', 
		{
			controller: 'loginCtrl',
			templateUrl: 'login.html'
		}).
		when('/usrprofile/',
		{
			controller:'userprofile',
			templateUrl : 'myprofile.html'
		});
	}]);
	
	gimme.controller('mainCtrl', function($scope, SignUpUser)
	{
		$scope.NAME_REGEXP = /^[a-zA-Z_.-]+[0-9a-zA-Z_]*$/i;
		$scope.EMAIL_REGEXP = /^[A-Za-z0-9]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$/;
		$scope.VPSWD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/i;
		
		$scope.registerUser = function()
		{
			SignUpUser.save($scope.user, function(user) 
			{
				alert("Sign Up Successful");
			});
		}
	});
	
	gimme.controller('userprofile', function($scope) {
		alert("Loading...");
	});
			
	gimme.controller('loginCtrl', function($scope, $location, LoginUser)	
	{
		$scope.loginUser = function()
		{
			LoginUser.save($scope.loguser, function(loguser)
			{
				alert(loguser.usremail);
				if(loguser.usremail==undefined || loguser.pswd == undefined)
				{
					alert("Invalid Login / Please Sign up with "+$scope.loguser.logemail);
				}
				else
				{
					$location.path('/usrprofile/');
				}
			});
		}
	});
