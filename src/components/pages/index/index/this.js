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
			this.headerInit();
			this.render();
		    this.initEvents();
		},
		headerInit:function(){
			header.init({path:this.path,hash:this.hash,title:this.options.title,goBack:false,onBack:this.finish.bind(this)});
		},
		onResume:function(){
			this.headerInit();
		},
		render:function(data){
			var templatePath = this.tempPath + "this.html" + "?r=" + appConfig.version;
			var template = new EJS({
				url:templatePath
			});
			this.rootEl.html(template.render(data));
		},
		initEvents:function(){
			this.toImportsEvent();
			this.toOrderEvent();
			this.toImportsAddEvent();
			this.toMyEvent();
		},
		toImportsEvent:function(){
			this.rootEl.on("click",".index_imports",function(e){
				location.href = "/imports.html";
			}.bind(this));
		},
		toOrderEvent:function(){
			this.rootEl.on("click",".index_order",function(e){
				location.href = "/order.html";
			}.bind(this));
		},
		toImportsAddEvent:function(){
			this.rootEl.on("click",".index_imports_add",function(e){
				location.href = "/imports.html#add";
			}.bind(this));
		},
		toMyEvent:function(){
			this.rootEl.on("click",".index_my",function(e){
				location.href = "/my.html";
			}.bind(this));
		}
	});
	return MyActivity;
})