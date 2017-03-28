define(['jquery','jquery.cookie'],function(){
	 var main={
         config:{
           url:''
         },
         init:function(){
			 var url;
			 if(location.host === "dev-adm.525happy.cn"){
				 url = "http://dev-admapi.525happy.cn"
			 }
			 else if(location.host === "pre-adm.525happy.cn"){
				 url = "http://pre-admapi.525happy.cn"
			 }
			 else if(location.host === "adm.biechipang.net"){
				 url = "http://admapi.biechipang.net"
			 } 
             this.config.url=this.GetQueryString('test')==1 ? 'http://172.17.0.64:8080' :url; //方钱有
           //this.config.url=this.GetQueryString('test')==2 ? 'http://172.17.0.77' :url; //曹勇
           //this.config.url=this.GetQueryString('test')==3 ? 'http://172.17.10.162:8080':url; //胡海平
             this.ajax_default();
         },
         GetQueryString:function(name) {
            var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
			 if(result == null || result.length < 1){
				 return "";
			 }
			 return result[1];
        },
         ifNotNull:function(obj){
             if(obj != null && obj != "undefined" && obj != "null" && typeof(obj) != "undefined" && obj != undefined && typeof(obj) != undefined) {
                 obj = $.trim(obj+"");
                 if(obj != "") {
                     return true;
                 } else {
                     return false;
                 }
             } else {
                 return false;
             }
         },
		  CheckUrl:function(str) {
			var RegUrl = new RegExp();
			RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
			if (!RegUrl.test(str)) {
				return false;
			}
			return true;
		},
		ajax_default:function(data) {
             $.ajaxSetup({
                 timeout: 300000,
                 xhrFields: {
                     withCredentials:true
                 },
				 complete:function(){
					if($.cookie('drpLayout')==0){parent.location.href ='/login.html';location.replace('/login.html')}
				 }
             })
         },
		 formatDate:function(time,template) {
			var t = this.parseDate(time), 
				fy = t.getFullYear(), y = (fy.toString()).replace(/\d+(\d\d)$/,"$1"), m = t.getMonth()+1, d = t.getDate(), h = t.getHours(), n = t.getMinutes(), s = t.getSeconds(),
				temp = template||"yy-mm-dd";
			return temp.replace(/yyyy/ig, fy).replace(/yy/ig, y).replace(/mm/ig, (m<10?"0"+m:m)).replace(/dd/ig, (d<10?"0"+d:d)).replace(/hh/ig, (h<10?"0"+h:h)).replace(/nn/ig, (n<10?"0"+n:n)).replace(/ss/ig, (s<10?"0"+s:s));
		 },
		 parseDate:function(d){
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
     };
    main.init();
    return main;
});