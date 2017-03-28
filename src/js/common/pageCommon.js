(function(){
	function init(callback){
		callback = callback || function(){};
		var isDest = 0;
		var type = "dev"; //dev pre online
		var clientId = (type === "dev"?"40aee187-053d-448d-b975-035106ec1643":(type === "pre"?"40aee187-053d-448d-b975-035106ec1643":"3922eb23-3f48-4a5b-8767-df278b90b40e"));
		var domain = (type === "dev"?"http://dev-passport.525happy.cn/":(type === "pre"?"http://pre-passport.525happy.cn/":"https://passport.biechipang.net/"));
		var appConfig = {
			domain:domain,
			clientId:clientId,
			platform:4,
			interfaceVersion:'1.1.0',
			version:isDest?"3B99A34E98C4DBHA":Date.now(),
			dir:isDest?"dest":"src"
		};
		window.appConfig = appConfig;
		var doc = document;
		var head = doc.getElementsByTagName("head")[0];
		var version = appConfig.version;

		var PubCSS = doc.createElement('link');
		PubCSS.setAttribute("rel","stylesheet");
		PubCSS.setAttribute("type","text/css");
		PubCSS.setAttribute("href","./css/public.css?v=" + version);
		head.appendChild(PubCSS);
		
		var thePath = location.pathname.replace(/\/(.*?)\..*/g,"$1");
		thePath = (thePath == "/"?"index":thePath);
		
		var AMDScript = doc.createElement('script');
		AMDScript.setAttribute("data-main","./pages/" + thePath + "/main.js?v=" + version);
		AMDScript.setAttribute("src","./js/require.js?v=" + version);
		head.appendChild(AMDScript);
		callback();
	}
	
	function createDom(){
		var appContainer = document.createElement("div");
		appContainer.setAttribute("id","appContainer")
		appContainer.className = "appContainer";
		document.body.appendChild(appContainer);
		appContainer.innerHTML = '<div id="viewContainer"></div>';
	}
	
	if(document.documentElement.clientWidth > 768){
		document.write("正在跳转至PC端，请稍候...");
	}
	else{
		init(createDom);
	}
})()