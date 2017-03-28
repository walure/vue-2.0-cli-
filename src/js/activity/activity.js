define(["class","activityManage","route","workspace","ui/loading"],function(Class,ActivityManage,Router,Workspace,loading){
	window.parseDate=function(d){
		if(Object.prototype.toString.call(d) === '[object Date]') return d;
		if(/^\d+$/.exec(d)) return new Date(d);
		var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})(\s|T)(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?(\.(\d{1,3}))?(\+(\d{1,2}))?$/g,
			arr = reg.exec(d),
			date = new Date();
		if(arr){
			date.setFullYear(arr[1],arr[2]-1,arr[3]);
			date.setHours(
				arr[13]?(arr[5]-0)+(arr[13]-0):arr[5],
				arr[7]?arr[7]:0,
				arr[9]?arr[9]:0,
				arr[11]?arr[11]:0);
		}
		return date;
	}
	window.formatDate=function(time,template) {
		var t = parseDate(time),
			fy = t.getFullYear(), y = (fy.toString()).replace(/\d+(\d\d)$/,"$1"), m = t.getMonth()+1, d = t.getDate(), h = t.getHours(), n = t.getMinutes(), s = t.getSeconds(),
			temp = template||"yy-mm-dd";
		return temp.replace(/yyyy/ig, fy).replace(/yy/ig, y).replace(/mm/ig, (m<10?"0"+m:m)).replace(/dd/ig, (d<10?"0"+d:d)).replace(/hh/ig, (h<10?"0"+h:h)).replace(/nn/ig, (n<10?"0"+n:n)).replace(/ss/ig, (s<10?"0"+s:s));
	}


	function getTitleByName(name){
		var config = Workspace.config;
		for(var i = 0,o;o = config[i];i++){
			if(o.name === name){
				return o.title;
			}
		}
	}
	function deepCopy(source) {
		if(typeof source !=="object"){return source}
		var $isArray = Array.isArray || function(object){ return object instanceof Array};
		var isArray = $isArray(source);
		var result = (isArray?[]:{});
		if(isArray){
			for(var key = 0;key < source.length;key++){
				result[key] = (typeof source[key]==="object"?deepCopy(source[key]): source[key]);
			}
		}
		else{
			for(var key in source){
				result[key] = (typeof source[key]==="object"?deepCopy(source[key]): source[key]);
			}
		}
		return result;
	}
	//var activityDatas = {};
	var Activity = Class.extend({
		init:function(options){
		},
		bindAll:function(key,prop){
			this[key] = deepCopy(prop);
			for(var fn in this[key]){
				this[key][fn] = this[key][fn].bind(this);
			}
		},
		onPause:function(){

		},
		onResume:function(data){

		},
		onDestory:function(){
			
		},
		addGlobalEvent:function(activityName,evName,fnName){
			var obj = {
				evName:evName,
				functionName:fnName
			};
			obj[fnName] = this[fnName].bind(this);
			activityEvents[activityName].push(obj);
			$(window).on(evName,obj[fnName]);
		},
		open:function(data){
			//console.log(JSON.stringify(data));
			var theData = this.data = $.extend({},{
				isReferSelf:false,
				name:null,
				url:null,
				title:document.title,
				type:null,
				data:null
			},data);
			if(!theData.name){
				theData.name = theData.url.split("/")[0];
			}
			if(theData.isReferSelf && theData.url.split("/")[0] === "bindMobile"){
				window.activityData.bindMobileGoBack = true;
			}
			if(theData.data != null){
				//activityDatas[theData.url] = JSON.stringify(theData.data);
				sessionStorage[theData.url] = JSON.stringify(theData.data);
			}
			if(theData.type === "replace"){
				window.history.replaceState( {} , theData.title,location.pathname+location.search+'#'+theData.url);
				var args = theData.url.split("/")
				args.splice(0,1);
				ActivityManage.trigger(theData.name,getTitleByName(theData.name),args);
				Router.history.navigate(theData.url);
			}else if(theData.type === "rename"){
				window.history.replaceState( {} , this.data.title,location.pathname+location.search+'#'+this.data.name );
			}else{
				location.hash='#' + theData.url;
			}
		},
		finish:function(){
			var hash = location.hash;
			if(hash === ""){return null;}
			/*var url = hash.split("#")[1];
			if(activityDatas[url] != null){
				activityDatas[url] = null;
				delete activityDatas[url];
			}*/
			ActivityManage.finish.apply(this,arguments);
		},
		getActivityData:function(){
			var hash = location.hash;
			if(hash === ""){return null;}
			var url = hash.split("#")[1];
			if(!url){return null;}
			var data;
			try{
				data = JSON.parse(sessionStorage[url]);
			}
			catch(e){
				data = sessionStorage[url];
			}
			return data;
		},
		getData:function(d){
			/*
			d.data = $.extend({},{
				platform:appConfig.platform,
				version:appConfig.interfaceVersion ,
				openId:getCookie("openId"),
				requestId:Date.now() + parseInt(Math.random() * 1000000000000)
			},d.data);
			*/
			var url = d.url;
			$.ajax({
				url:url,
				dataType:"json",
				type:d.type || 'get',
				xhrFields:{
					withCredentials:true
				},
				/*contentType:d.contentType || 'application/x-www-form-urlencoded',
				processData:(d.contentType === 'application/json'?false:true),*/
				timeout:d.timeout || 120000,
				data:d.data,
				success:function(data){
					if(data.code === "success"){
						d.success && d.success(data);
					}
					else if(data.code === "failure"){
						console.log("failure! msg:" + data.msg + "|" + "errorMsg:" + data.errorMsg + "|" + "url:" + url);
						d.error && d.error(data);
					}
					loading.hide();
				}.bind(this),
				error:function(){
					loading.hide();
					d.error && d.error();
				}.bind(this)
			});
		},
		$:function(selector){
			return $(selector,this.options.el);
		},
		/*setItem:function (name,data){
			sessionStorage.setItem(name,JSON.stringify(data));
		},
		removeItem:function (name){
			sessionStorage.removeItem(name);
		},*/
		getmenuId:function (callBack){
			callBack  = callBack || function (){};
			var menuId =  $('.left_menu_ul li.curr',parent.window.document).attr('tid');
			var menuUrl = url.drp + '/resource/button/get';
			$.ajax({
				url:menuUrl,
				data:{menuId:menuId},
				success:function (data){
					callBack(data);
				},
			});
		},
	});
	return Activity;
})