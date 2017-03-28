define(["ui/loading","common/util","activity","ui/header","ejs"],function(loading,util,Activity,header){
	var MyActivity = Activity.extend({
		init: function (options){
			this.options = $.extend({},{
				el:null,
				tempPath:""
			},options);
			this.path = this.options.path;
			this.hash = this.options.hash;
			this.tempPath = this.options.tempPath;
			this.rootEl = this.options.el;
			this.body = $("body").addClass("bg_white");
			this.headerInit();
			this.render();
		    this.initEvents();
		},
		headerInit:function(){
			header.init({path:this.path,hash:this.hash,title:this.options.title,goBack:true,onBack:this.finish.bind(this)});
		},
		onResume:function(){
			this.init(this.options);
		},
		onDestory:function(){
			this.body.removeClass("bg_white");
		},
		onPause:function(){
			this.body.removeClass("bg_white");
		},
		render:function(data){
			var templatePath = this.tempPath + "this.html" + "?r=" + appConfig.version;
			var template = new EJS({
				url:templatePath
			});
			this.rootEl.html(template.render(data));
		},
		initEvents:function(){
			//initEvents
			//this.toSubPageEvent();
			this.toOrderConfirmEvent();
		},
		toOrderConfirmEvent:function(){
			this.rootEl.on("click",".js_order_create",function(e){
				this.open({
					url:'confirm',
					data:[{
						"a":1
					},{
						"a":2
					}]
				});
			}.bind(this));
		}
	});
	return MyActivity;
})