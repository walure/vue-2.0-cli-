require(["/js/common/rConfig.js"],function(config){
	var path = "agentManage";
	config(path);
	require(["workspace","route","fastClick","ejs","jquery.cookie"],function(Workspace,Router){
		var workspace = new Workspace({
			path:path
		});
		FastClick.attach(document.body);
		Router.history.start();
	});
})