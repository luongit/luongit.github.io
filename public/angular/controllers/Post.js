app.controller('Post', function($http,$scope,$rootScope,$location,$routeParams){
	function get_post(){
		$http.get(_api+'post').then(function(res){
			$scope.posts = res.data;
			$scope.totalItems = $scope.posts.length;
		});
	}

	function get_category(){
		$http.get(_api+'category').then(function(res){
			$scope.categories = res.data;
		});
	}
	
	get_category();
	get_post();
	$scope.videoType = [{val:1,label:"Youtube id"},{val:2,label:"Google Drive id"}];
	$scope.statuss = [{val:false,label:"Ẩn"},{val:true,label:"Hiển thị"}];
	$scope.add_post = () => {
		$http.post(_api+'add-post',$scope.post,config).then(function(res){
			toastr.success('Thêm mới danh mục thành công','', {
				timeOut: 2000,
				positionClass:"toast-bottom-center"
			});
			get_post();
			$('#add-cat').modal('hide');
			$scope.cat = null;
			$location.path('post');
		});
	}

	

	$scope.del_post = id => {
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
		    $http.get(_api+'delete-post/'+id).then(function(res){
				get_post();
				toastr.warning('Xóa bài viết thành công','', {
					timeOut: 2000,
					positionClass:"toast-bottom-right"
				});
				$location.path('/post');
			});
		  }
		})
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

	// chinh sua bao viet
	if ($routeParams.id) {
		var id = $routeParams.id;
		$http.get(_api+'post/'+id).then(function(res){
			$scope.post = res.data;
			$('textarea[name="content"]').html(res.data.content);
		});

		$scope.up_post = () => {
			$http.post(_api+'update-post/'+id,$scope.post,config).then(function(res){
				toastr.success('Thêm mới danh mục thành công','', {
					timeOut: 2000,
					positionClass:"toast-bottom-center"
				});
				get_post();
				$('#add-cat').modal('hide');
				$scope.cat = null;
				$location.path('post');
			});
		}
	}
	// tinymce config
	$scope.tinymceOptions = {
	    onChange: function(e) {
	      // put logic here for keypress and cut/paste changes
	    },
	    inline: false,
	    height: 250,
	 	menubar: false,
	   	plugins: [
			"advlist autolink lists link image charmap print preview hr anchor pagebreak",
			"searchreplace wordcount visualblocks visualchars fullscreen",
			"insertdatetime media nonbreaking save table contextmenu directionality",
			"emoticons template paste textcolor colorpicker textpattern imagetools code fullscreen"
		],
	    toolbar1: "undo redo bold italic underline | alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote link unlink anchor image media | preview | forecolor backcolor fullscreen code",
		image_advtab: true,
		menubar: false,
		code_dialog_height: 200,
		encoding: 'html',
		entity_encoding : 'raw', //Sửa lỗi khi hiển thị code có dấu tiếng việt
		schema: 'html5',
		toolbar_items_size: 'small',
	    relative_urls: false,
	    remove_script_host : false
	};
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
                $http.get(_api+'post_by_name/'+cat_name).then(function(res){
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

app.directive('fileModel',function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
	      var model = $parse(attrs.fileModel);
	      var modelSetter = model.assign;
	      
	      element.bind('change', function(){
	         scope.$apply(function(){
	            modelSetter(scope, element[0].files[0]);
	         });
	      });
	   }
	};
});

app.directive('editor', function () {
  return {
     restrict: 'A',
     scope: true,
     link: function (scope, el, attrs) {
        // set up editor on load
        angular.element(document).ready(function () {
          scope.$editor = bkLib.onDomLoaded(function() {
          area2 = new nicEditor({fullPanel : true}).panelInstance('myNicPanel');
          scope.$apply();
    	 });
          
        });
     }
  }
});