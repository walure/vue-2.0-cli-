define(function(){
	return function(path){
		var config = {
			shim:{
				'bootstrap.min': ['jquery'],
				'bootstrap-table': ['jquery'],
				'bootstrap-editable': ['jquery'],
				'bootstrap-table-editable': ['jquery','bootstrap-table'],
				'bootstrap-datetimepicker': ['jquery','bootstrap.min'],
				'bootstrap-datetimepicker.zh-CN': ['jquery','bootstrap-datetimepicker'],
				'bootstrap-switch': ['jquery'],
				'route': ['jquery'],
				'jquery.form': ['jquery'],
				'jquery.zclip': ['jquery'],
				'jquery.cookie': ['jquery'],
				'umeditor.config':['jquery'],
				'umeditor.min':['jquery'],
			},
			baseUrl: "./js/",
			paths: {
				class:"lib/class/class",
				fastClick:"lib/fastClick/0.6.7/fastClick",
				route: "lib/route/1.0.0/route",
				ejs: "lib/ejs/1.0.0/ejs",
				swiper:"lib/swiper/3.0.4/swiper.min",
				activityManage:"activity/activityManage",
				activity:"activity/activity",
				workCommon:"common/workCommon",
				workspace:"/pages/" + path + "/workspace",
				'jquery': "lib/jquery/2.2.3/jquery.min",
				'jquery.cookie': "lib/jquery.cookie/1.4.1/jquery.cookie",
				'jquery.form': "lib/jquery.form/3.23/jquery.form",
				'jquery.zclip': "lib/jquery.zclip/1.1.1/jquery.zclip.min",
				'bootstrap.min': "lib/bootstrap/3.3.5/bootstrap",
				'bootstrap-editable': "lib/bootstrap-editable/1.5.1/bootstrap-editable",
				'bootstrap-table': "lib/bootstrap-table/1.10.1/bootstrap-table",
				'bootstrap-table-editable': "lib/bootstrap-table-editable/1.0.0/bootstrap-table-editable",
				'bootstrap-switch': "lib/bootstrap-switch/3.3.2/bootstrap-switch.min",
				'bootstrap-datetimepicker':"lib/bootstrap-datetimepicker/2.0.0/bootstrap-datetimepicker.min",
				'bootstrap-datetimepicker.zh-CN':"lib/bootstrap-datetimepicker/2.0.0/bootstrap-datetimepicker.zh-CN",
			},
			urlArgs: "v=" +  appConfig.version
		}
		requirejs.config(config);
	}
});