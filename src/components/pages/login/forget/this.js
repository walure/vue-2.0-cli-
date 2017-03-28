define(["ui/loading","common/util","activity","ui/header","ejs"],function(loading,util,Activity,header){
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
			this.count=0;
			this.render();
		    this.initEvents();
        },
        render:function(){
            var templatePath = this.tempPath + "this.html" + "?r=" + appConfig.version;
            var template = new EJS({
                url:templatePath
            });
            this.rootEl.html(template.render());

        },
        initEvents:function(){
			this.rootEl.on('click','.submit',this.submit.bind(this));
			this.rootEl.on('click','.sendCode',function (e) {
				if(this.$('.sendCode').attr('clicks')!='no') {
					this.check_phone(function () {
						this.sendCode_txt();
					}.bind(this))
				}
			}.bind(this));

        },
		sendCode_txt:function () {
			this.count++;
			if(!this.$('.sendCode').hasClass('sendYzm')) this.$('.sendCode').addClass('sendYzm');

			this.$('.sendCode').html(60-this.count+'s').attr('clicks','no');
			if(this.count>=60){
				this.count=0;
				this.$('.sendCode').removeClass('sendYzm');
				this.$('.sendCode').html('重新发送').attr('clicks','yes');
				return;
			}
        	setTimeout(function () {
				this.sendCode_txt()
			}.bind(this),1000)
		},
		submit:function(){
			var tip='';
			var phone=this.$('input[name=username]').val();
			if(!phone){
				tip='手机号码不能为空';
			}else if(!/^1\d{10}$/g.test($.trim(phone))){
				tip='请输入正确的手机号码';
			}else if(!(this.$('input[name=yzm]').val())){
				tip='验证码码不能为空';
			}
			if(tip){
				this.$('.error_tip').html(tip);
				return
			}
			this.validateCode(function () {
				this.open({	url:'setPassword/'+this.$('input[name=username]').val()+'/'+this.$('input[name=yzm]').val()})
			}.bind(this));
		},
		check_phone:function (callback) {
			var tip='';
			var phone=this.$('input[name=username]').val();
			if(!phone){
				tip='手机号码不能为空';
			}else if(!/^1\d{10}$/g.test($.trim(phone))){
				tip='请输入正确的手机号码';
			}
			if(tip){
				this.$('.error_tip').html(tip);
				return
			}
			this.$('.sendCode').attr('clicks','no');
			var logUrl = 'staff/phone/check';
			this.getData({
				url:logUrl,
				data:{phone:phone},
				success:function (d) {
					this.sendCode(callback);
				}.bind(this),
				error:function (data) {
					this.$('.error_tip').html(data.errorMsg || '');
					this.$('.sendCode').attr('clicks','yes');
				}.bind(this)

			})
		},
		sendCode:function(callback){
			var logUrl = 'verificationCode';
			this.getData({
					url:logUrl,
					domain:'passport',
					headers:{
						platform:appConfig.platform,
						version:appConfig.appVersion
					},
					//crossDomain:true,
					xhrFields:{withCredentials:false},
					data:{
						phone:this.$('input[name=username]').val(),
						type:1
					},
					success:function (d) {
						callback();
					},
					error:function (d) {
						this.$('.sendCode').attr('clicks','yes');
						this.$('.error_tip').html(d ? d.msg :  '');
					}.bind(this)
				})
		},
		validateCode:function(callback){
			var logUrl = 'verificationCode/validate';
			this.getData({
				url:logUrl,
				domain:'passport',
				headers:{
					platform:4,
					version:appConfig.appVersion
				},
				xhrFields:{withCredentials:false},
				data:{
					phone:this.$('input[name=username]').val(),
					code:this.$('input[name=yzm]').val(),
				},
				success:function (d) {
					callback();
				},
				error:function (data) {
					this.$('.error_tip').html(data.msg);
				}.bind(this)
			})
		}
    });
    return MyActivity;
})