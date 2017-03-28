define(["activityManage","route"],function(ActivityManage,Router){
	return function(config){
		var obj = {},name,express,title;
		obj.routes = {};
		for(var i = 0,o;o=config[i];i++){
			express = o.express;
			title = o.title;
			name = o.express.split('/')[0];
			if(o.name=='index')  name = "index";
			obj.routes[express] = name;
			obj[name] = (function(name,title){
				return function(){
					var url = name;
					for(var i = 0;i<arguments.length;i++){
						url += "/" + arguments[i];
					}
					ActivityManage.trigger(this.path,name,url,title,arguments);
				}
			})(name,title)
		}
		var Workspace = Router.Router.extend(obj);
		Workspace.config = config;
		return Workspace;
	}
});