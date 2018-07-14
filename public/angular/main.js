/**
* app Module
*
* Description
*/
var _url = 'https://lna-api.herokuapp.com';
var _api = _url+'/api/';
var config = { 
	headers: { 
		'Content-Type': 'application/x-www-form-urlencoded' 
	},
	transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
};

var app = angular.module('backend', [
	'ngRoute',
	'ngSanitize',
    'ngMessages'
]);
var app = angular.module('app', ['ngRoute','ngSanitize']);
app.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'layouts/home/index.html'
	})
    .when('/category/:catid',{
        templateUrl:'layouts/home/category.html',
        controller:'Category'
    })
    .when('/post/:pid',{
        templateUrl:'layouts/home/category.html',
        controller:'Post'
    })
    .when('/404',{
        templateUrl:'layouts/home/404.html',
    })
    .otherwise({redirectTo:'404'});
})

app.controller('Home', function($rootScope,$scope,$http,$routeParams){
    $rootScope.title = 'Trang chủ';
	$http.get(_api+'category').then(function(res){
		$rootScope.cats = res.data;
	});
    
    $http.get(_api+'post-limit/10').then(function(res){
        $scope.posts = res.data;
    });
    // $scope.$apply();
})


app.controller('Category', function($scope,$routeParams,$http){
    var catid = $routeParams.catid;
    if(catid){
        $http.get(_api+'category/'+catid).then(function(res){
            $scope.cat = res.data;
            $rootScope.title = res.data.name;
        });

        $http.get(_api+'post-by-cat/'+catid).then(function(res){
            $scope.posts = res.data;
            $scope.post = res.data[0];
            $('#player').attr('src','https://www.youtube.com/embed/'+res.data[0].video);
        });
    }else{
        $location.path('404');
    }
    
});

app.controller('Post', function($rootScope,$scope,$routeParams,$http,$location){
    var pid = $routeParams.pid;
    if(pid){
        $http.get(_api+'post/'+pid).then(function(res){
            $scope.post = res.data;
            $rootScope.title = res.data.name;
            $('#player').attr('src','https://www.youtube.com/embed/'+res.data.video);
            $('#gplayer').attr('src','https://drive.google.com/file/d/'+res.data.video+'/preview');
                $http.get(_api+'category/'+res.data.category_id).then(function(res){
                $scope.cat = res.data;
            });
            $http.get(_api+'post-by-cat/'+res.data.category_id).then(function(res){
                $scope.posts = res.data;
            });
        });
    }else{
        $location.path('404');
    }
});

app.directive('passwordVerify', passwordVerify);
function passwordVerify() {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // watch own value and re-validate on change
            scope.$watch(attrs.ngModel, function () {
                validate();
            });

            // observe the other value and re-validate on change
            attrs.$observe('passwordVerify', function (val) {
                validate();
            });

            var validate = function () {
                // values
                var val1 = ngModel.$viewValue;
                var val2 = attrs.passwordVerify;

                // set validity
                ngModel.$setValidity('passwordVerify', val1 === val2);
            };
        }
    };
}

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    };
}]);


function showMonth(month) {
    var m = [];
    for (var i = month + 1, j = 0; i <= 12; i++ , j++) {
        m[j] = i;
    }

    return m;
}
function showDay(day) {
    var d = [];
    for (var i = 1, j = 0; i <= day; i++ , j++) {
        d[j] = i;
    }

    return d;
}

