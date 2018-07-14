/*
 AngularJS v1.6.5
 (c) 2017 - 2018 Lna Core. http://lna.com
 License: MIT
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

app.config(function($routeProvider) {
	// console.log(routes);
	$routeProvider
    .when('/',{
        templateUrl:'layouts/backend/dashboard/main.html',
        controller:'Dashboard'
    })
    .when('/post',{
        templateUrl:'layouts/backend/post/list.html',
        controller:'Post'
    })
    .when('/post-add',{
        templateUrl:'layouts/backend/post/add.html',
        controller:'Post'
    })
     .when('/post-edit/:id',{
        templateUrl:'layouts/backend/post/edit.html',
        controller:'Post'
    })
    .when('/post-category',{
        templateUrl:'layouts/backend/post/category.html',
        controller:'Category'
    });

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

