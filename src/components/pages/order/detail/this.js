define(["ui/loading","common/util","activity","ui/header","ejs"],function(loading,util,Activity,header){
    var MyActivity = Activity.extend({
        init: function (options){
            this.options = $.extend({},{
				el:null,
				tempPath:""
			},options);
			this.id = this.options.args[0];
			this.path = this.options.path;
			this.hash = this.options.hash;
			this.tempPath = this.options.tempPath;
			this.rootEl = this.options.el;
			this.headerInit();
			this.render({id:this.id});
		    this.initEvents();
        },
		headerInit:function(){
			header.init({path:this.path,hash:this.hash,title:this.options.title,goBack:true,onBack:this.finish.bind(this)});
		},
		onResume:function(){
			this.init(this.options);
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
        }
    });
    return MyActivity;
})