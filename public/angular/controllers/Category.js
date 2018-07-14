app.controller('Category', function($http,$scope,$rootScope,$location){
	function get_category(){
		$http.get(_api+'category').then(function(res){
			$scope.categories = res.data;
			$scope.totalItems = $scope.categories.length;
		});
	}
	
	get_category();

	$scope.add_cat = () => {
		console.log($scope.cat.slug);
		$http.post(_api+'add-category',$scope.cat,config).then(function(res){
			toastr.success('Thêm mới danh mục thành công','', {
				timeOut: 2000,
				positionClass:"toast-bottom-center"
			});
			get_category();
			$('#add-cat').modal('hide');
			$scope.cat = null;
		});
	}

	$scope.del_cat = id => {
		swal({
			title: 'Bạn có chắc chắn không',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Có, xóa ngay!',
			cancelButtonText: 'Không'
		}).then((result) => {
		  if (result.value) {
		    $http.get(_api+'delete-category/'+id).then(function(res){
				get_category();
				toastr.warning('Xóa danh mục thành công','', {
					timeOut: 2000,
					positionClass:"toast-bottom-right"
				});
				$location.path('/post-category');
			});
		  }
		})
	}

	$scope.edit_cat = id => {
		$http.get(_api+'category/'+id).then(function(res){
			$scope.cate = res.data;
			$('#edit-cat').modal('show');
		});
	}
	$scope.post_edit_cat = id => {
		console.log($scope.cate);
		$http.post(_api+'update-category/'+id,$scope.cate,config).then(function(res){
			console.log(res);
			$('#edit-cat').modal('hide');
			get_category();
		});
	}
	$scope.viewby = 10;
	$scope.currentPage = 1;
	$scope.maxSize = 2; //Number of pager buttons to show
	$scope.itemsPerPage = $scope.viewby;

	$scope.setPage = function (pageNo) {
	    $scope.currentPage = pageNo;
	};

	$scope.setItemsPerPage = function(num) {
	  $scope.itemsPerPage = num;
	  $scope.currentPage = 1; //reset to first page
	}

});

app.directive('nameAvailable', nameAvailable);
function nameAvailable($http) {
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
            attrs.$observe('nameAvailable', function (val) {
                validate();
            });

            var validate = function () {
                // values
                var cat_name = ngModel.$viewValue;

                // set validity
                $http.get(_api+'category_by_name/'+cat_name).then(function(res){
	        		if (res.data && res.data.name == cat_name) {
			        	ngModel.$setValidity('nameAvailable', false); 
		        	}else{
		        		ngModel.$setValidity('nameAvailable', true); 
		        	}
		        });
            };
        }
    };
}


app.directive('slugAvailable', slugAvailable);
function slugAvailable($http) {
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
            attrs.$observe('slugAvailable', function (val) {
                validate();
            });

            var validate = function () {
                // values
                var cat_slug = ngModel.$viewValue;

                // set validity
                $http.get(_api+'category_by_slug/'+cat_slug).then(function(res){
	        		if (res.data && res.data.slug == cat_slug) {
			        	ngModel.$setValidity('slugAvailable', false); 
		        	}else{
		        		ngModel.$setValidity('slugAvailable', true); 
		        	}
		        });
            };
        }
    };
}
