exports.route = {
	name:"Quản lý bài viết",
	route:"/post",
	icon:'fa fa-home',
	controller:'Post',
	items: [
		{
			name:"Danh sách bài viết",
			route:"/post",
			icon:"fa fa-word-file",
			template:'post/list',
		},
		{
			name:"Thêm mới bài viết",
			route:"/post-add",
			icon:"fa fa-word-file",
			template:'post/add',
		},
		{
			name:"Danh mục bài viết",
			route:"/category",
			icon:"fa fa-word-file",
			template:'post/category',
			controller:'Category'
		}
	]
};