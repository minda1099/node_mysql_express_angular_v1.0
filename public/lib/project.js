	
var gimme = angular.module('gimme',['mysql']);
	
	gimme.config(['$routeProvider',function($routeProvider) 
	{
		$routeProvider.when('/',
		{
			templateUrl : 'signup.html',
			controller : 'mainCtrl'
		}).
		when('/logpg', 
		{
			templateUrl : 'login.html',
			controller : 'loginCtrl'
		});
	}]);
	
	function loginCtrl($scope)
	{ 
		alert('Loading...');
	}
	
	gimme.controller('mainCtrl', function($scope, $location, SignUpUser)
	{
		$scope.NAME_REGEXP = /^[a-zA-Z_.-]+[0-9a-zA-Z_]*$/i;
		$scope.EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
		$scope.VPSWD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/i;
		
		$scope.registerUser = function()
		{
			SignUpUser.save($scope.user, function(user) 
			{
				alert("Sign Up Successful");
			});
		}
	});
