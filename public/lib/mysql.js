//Update this to use mysql
angular.module('mysql', ['ngResource']).factory('SignUpUser', function ($resource) 
{
	var Project = $resource('/user', {}, 
	{
		update:
		{
			method:'PUT'
		}
	});

	return Project;
});
