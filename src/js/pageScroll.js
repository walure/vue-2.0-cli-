//写pageScorll
console.log('pageScorll.js');
import {cookieSet} from '@/js/cookie.js';
import Vue from 'vue'

export default class pageScorll {
	 constructor(options){
		this.url=options.url ,
		this.page=options.page || 1;
		this.pageSize=options.pageSize || 20;
		this.queryParm=options.queryParm || function () {};
		this.elBox=options.elBox;
		this.tbCls=options.tbCls || {};
		this.loadSuccess=options.loadSuccess || function () {};
		this.isLoad=false;
		this.load()
	}
	pageScroll () {
			var w=$(window);
			if(w.scrollTop()+ w.height() >= $(document).height() && this.scrollFlag && this.isScrollLoading){
				this.page++;
				this.pageList();
			}
		}
		
	
	addPageScroll () {
			activityManage.addGlobalEvent(this.hash,"scroll","pageScroll",this);
			return this;
		}
		refresh () {
			var templatePath = "/pages/common/table.html" + "?r=" + appConfig.version;;
			var template = new EJS({
				url:templatePath
			});
			this.elBox.html(template.render({title:this.tbCls}));
			this.page=1;
			this.pageList(1);
			this.addPageScroll();
			return this
		}
		listData(callback){
			
			this.isScrollLoading=false;
			var logUrl = this.url;
			var parm={
				distributorId:cookieSet.getCookie('agtDistributorId'),
				page:this.page,
				pageSize:this.pageSize,
			};
			var queryParm=this.queryParm();
			for(var i in queryParm){
				if(queryParm[i]!=='') parm[i]=queryParm[i];
			}
			
			debugger
			return
			Vue.$http.get(logUrl,
			  {
				params:parm,
			  }).then(function(res){
				if(res.body.code=='failure'){
					this.error_tip=res.body.msg;
				}else{
					callback(res.body.data);
				}
			  },function(){
				this.error_tip='网络不给力，请稍后再试!'
			});
			return;
			activityManage.getData({
				url:logUrl,
				data:parm,
				success:function (d) {
					callback(d.data);
				}.bind(this),
				error:function (data) {
					this.isScrollLoading=true;
				}.bind(this)
			});
		}
		pageList (type) {
			//this.elBox.find('.more').html('数据加载中...');
			this.listData(function (d) {
				this.isLoad=true;
				if(d.length<this.pageSize){
					this.scrollFlag=false;
				}else{
					this.isScrollLoading=true;
					this.scrollFlag=true;
				}
				
			/*	var templatePath = "/pages/common/table.html" + "?r=" + appConfig.version;;
				var template = new EJS({
					url:templatePath
				});
				if(type){
					this.elBox.find('tbody').html(template.render({title:this.tbCls,data:d}));
				}else{
					this.elBox.find('tbody').append(template.render({title:this.tbCls,data:d}));
				}
				if(d.length<this.pageSize){
					this.elBox.find('.more').show();
				}else{
					this.elBox.find('.more').hide();
				}
				if(this.page==1 && d.length==0){
					this.elBox.find('.more').html('暂无数据');
				}else{
					this.elBox.find('.more').html('已显示全部');
				}
				*/
				this.loadSuccess();
			}.bind(this))
		}
		load (){
			if(this.isLoad) return;
			//var templatePath = "/pages/common/table.html" + "?r=" + appConfig.version;;
			//var template = new EJS({
				//url:templatePath
			//});
			//this.elBox.html(template.render({title:this.tbCls}));
			this.pageList();
		}
		
		
}
