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
			this.toDetailEvent();
			this.toImportsAddEvent();
		},
		toDetailEvent:function(){
			this.rootEl.on("click","tr td.js_detail",function(e){
				var $target = $(e.currentTarget);
				this.open({
					url:'detail/' + $target.text(),
					data:{
						id:$target.text()
					}
				});
			}.bind(this));
		},
		toImportsAddEvent:function(){
			this.rootEl.on("click",".ico_new_atd",function(e){
				this.open({
					url:'add'
				});
			}.bind(this));
		}
	});
	return MyActivity;
})