define(["ui/loading","common/util","activity","ui/header","ui/confirm","ejs"],function(loading,util,Activity,header,Confirm){
    var MyActivity = Activity.extend({
        init: function (options){
            this.options = $.extend({},{
				el:null,
				tempPath:""
			},options);
			this.path = this.options.path;
			this.hash = this.options.hash;
			this.tempPath = this.options.tempPath;
			this.rootEl = this.options.el;
			this.render();
		    this.initEvents();
        },
        render:function(){
            var templatePath = this.tempPath + "this.html" + "?r=" + appConfig.version;
            var template = new EJS({
                url:templatePath
            });
            this.rootEl.html(template.render());
			this.confirm=new Confirm({
				isShow:false,
				title:"重置密码成功",
				desc:"正在为您跳转到登录页面...",
				btns:[{
					txt:"确定",
					cls:"confirm_ok",
					callback:function(cf){
						cf.hide();
						$.removeCookie('agtUsername') ;
						$.removeCookie('agtUId') ;
						$.removeCookie('agtLoginId') ;
						$.removeCookie('agtLayout');
						$.cookie('isExit','1');
						location.href='/login.html';
					}.bind(this)
				}],
				default:function () {
					setTimeout(function () {
						if($.cookie('isExit')){
							$.removeCookie('isExit') ;
							return
						}
						$.removeCookie('agtUsername') ;
						$.removeCookie('agtUId') ;
						$.removeCookie('agtLoginId') ;
						$.removeCookie('agtLayout');
						location.href='/login.html';
					},3000)
				}
			});

        },
        initEvents:function(){
			this.rootEl.on('click','.submit',this.submit.bind(this));
			this.rootEl.on('click','.sendCode',function () {
				if(this.rootEl.find('.sendCode').attr('clicks')!='no') this.sendCode();
			}.bind(this));

			this.rootEl.on('click','.user-pasw i',function (e) {
				var $target=$(e.currentTarget);
				if($target.hasClass('icon_eye_open')){
					$target.removeClass('icon_eye_open');
					$target.addClass('icon_eye_close');
					$target.prev().attr('type','text');
				}else{
					$target.removeClass('icon_eye_close');
					$target.addClass('icon_eye_open');
					$target.prev().attr('type','password');
				}
			}.bind(this));

        },
		submit:function(){
			var tip='';
			if(!(this.$('input[name=password]').val())){
				tip='密码不能为空';
			}else if(this.$('input[name=password]').val().length<6){
				tip='密码长度不能小于6位数';
			}else if(this.$('input[name=password]').val()!=this.$('input[name=password1]').val()){
				tip='两次密码输入不一样';
			}
			if(tip){
				$('.error_tip').html(tip);
				return
			}
			this.submit_data();
		},
		submit_data:function(){
			var logUrl = 'staff/modifyPassword';
			this.getData({
				url:logUrl,
				data:{
					password:this.$('input[name=password]').val(),
					phone:this.options.args[0],
					code:this.options.args[1]
				},
				success:function(data){
					this.confirm.show();
				}.bind(this),
				error:function (data) {
					this.$('.error_tip').html(data.msg);
				}.bind(this)
			})
		},
    });
    return MyActivity;
})