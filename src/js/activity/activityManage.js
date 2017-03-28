define(["ui/loading","jquery"],function(loading){
	window.activityEvents = {};
	window.activityData = {};
	var refer = current = "";
	var hash = {};
	var finishData = null;
	ActivityManage = {
		trigger:function(path,name,url,title,args){
			if(url === current){return}
			if(hash[current]){
				hash[current].$el.hide();
			}
			if(url != "index" && window.parent != window){
				/*var parentHref = window.parent.location.href.replace(/\!\!.*\!\!/,"");
				window.parent.history.replaceState({},window.parent.document.title,parentHref + "!!" + encodeURIComponent("#" + url) + "!!")*/
				var parentHash = window.parent.location.hash.replace(/\!\!.*\!\!/,"");
				window.parent.location.hash = parentHash + "!!" + encodeURIComponent("#" + url) + "!!";
			}
			if(!!hash[current]){
				hash[current].elObj.onPause();
			}
			if(!!hash[url]){
				var curr = hash[url];
				curr.$el.show();
				curr.elObj.onResume(finishData);
				finishData = null;
				refer = current;
				current = url;
				document.title = title;
				return;
			}
			finishData = null;
			ActivityManage.startActivity(path,name,url,title,args);

		},
		startActivity:function(path,name,url,title,args){
			//$("body").removeClass("bg_white");
			/*window.activityEvents[name] = [];
			if(current){
				var arr = window.activityEvents[current.name];
				for(var i = 0,o;o = arr[i];i++){
					$(window).off(o.evName,o[o.functionName]);
				}
				window.activityEvents[current.name] = [];
			}
			loading.show();*/
			
			//var path = location.pathname.replace(/\/frame\/(.*)\/index.*/,"$1");
			(function() {
				var lk = document.createElement("link");  
				lk.setAttribute("rel", "stylesheet");  
				lk.setAttribute("type", "text/css");  
				lk.setAttribute("href", "/pages/" + path + "/" + name + "/this.css");
				var head = document.getElementsByTagName("head")[0];
				head.appendChild(lk);
			})();
			
			require(["/pages/" + path + "/" + name + "/this.js"],function(Activity){
				var $el = $('<div class="view"></div>');
				$("#viewContainer").append($el);
				var elObj = new Activity({
					hash:url,
					path:path,
					title:title,
					tempPath:"/pages/" + path + "/" + name + "/",
					el:$el,
					args:args
				});
				ActivityManage.setCurrentAcitivity(name,url,title,$el,elObj);
			});
		},
		setCurrentAcitivity:function(name,url,title,$el,elObj){
			document.title = title || "";
			refer = current;
			current = url;
			hash[url] = {
				name:name,
				url:url,
				$el:$el,
				elObj:elObj
			};
		},
		getCurrentAcitivity:function(){
			return hash[current];
		},
		finish:function(data){
			if(current){
				hash[current].$el.off();
				hash[current].$el.remove();
				hash[current].elObj.onDestory();
				hash[current].elObj = null;

				delete hash[current];
			}
			finishData = data;
			history.go(-1);
		}
	}
	return ActivityManage;
})