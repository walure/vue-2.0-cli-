define(["ui/loading","common/util","activity","ui/header","ejs"],function(loading,util,Activity,header){
	var MyActivity = Activity.extend({
		init: function (options){
			this.options = $.extend({},{
				el:null,
				tempPath:""
			},options);
			this.path = this.options.path;
			this.tempPath = this.options.tempPath;
			this.rootEl = this.options.el;
			this.render(this.path + "|index");
			header.init(this.path,{title:'下级管理',goBack:true});
			this.reName();
		    this.initEvents();
		},
		reName:function(){
			this.swiperBox = this.rootEl.find(".js_swiper_box");
		},
		render:function(data){
			var templatePath = this.tempPath + "this.html" + "?r=" + appConfig.version;
			var template = new EJS({
				url:templatePath
			});
			this.rootEl.html(template.render(data));
		},
		initEvents:function(){

			var elBox=$('.subordinate_management');
			elBox.on('click','.add',function () {
				LWH.history.navigate('add_business',true);
				header.setTitle()
			});



			this.initSearchEvent();
			/**/
			this.goDetails();
			/**/
		},
		initSearchEvent:function (){
			this.rootEl.on("click",".category .choice",function(e){
				this.$('#keywords').val('');
				$('.category .choice span').hide();
				$(e.currentTarget).find('span').show();
				var isShow = $(e.currentTarget).find('span').css('display');
			}.bind(this));

			this.rootEl.on("click","#search_btn",function(e){
				//console.log(this.$('.errorMsg span').html('请输入关键字'));
				/*刷新取数据关键字*/
				this.$('#list').attr('refresh','key');
				this.$('#list').bootstrapTable('refresh');
			}.bind(this));

			this.rootEl.on("input","#keywords",function(e){
				this.$('.errorMsg span').html('')
			}.bind(this));
			/*1111*/
		},
		goDetails:function (){
			this.rootEl.on("click","tbody tr td.js_number",function(e){
				var oHtml = $(e.currentTarget).html();
				this.open({
					url:'details',
					data:{
						purchaseNo:oHtml,
					}
				});
			}.bind(this));
		}
	});
	return MyActivity;
})