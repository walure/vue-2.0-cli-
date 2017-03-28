require(["/js/common/rConfig.js"],function(config){
	var path = "login";
	config(path);
	require(["workspace","route","fastClick","ejs","jquery.cookie"],function(Workspace,Router){
		var workspace = new Workspace({
			path:path
		});
		FastClick.attach(document.body);
		Router.history.start();
	});
})