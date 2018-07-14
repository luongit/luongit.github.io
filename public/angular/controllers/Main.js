app.controller('Main', function($http,$rootScope,$scope){
	var _route_api = _api+'get-route';
	$http.get(_route_api).then(function(res){
		$rootScope.navbars = res.data;
	});

});