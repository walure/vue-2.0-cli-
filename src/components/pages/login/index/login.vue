<template>
	<div id="container" class="con loginIndex">
    <div id="canvas_con" class="canvas_con"></div>
    <div class="login">
        <div class="login_inner">
            <h2>分销系统</h2>
            <div class="t1"><i class="icon-account"></i><input type="text"  name="username" ref="username" placeholder="用户名" /></div>
            <div class="t2"><i class="icon-password"></i><input type="password" name="password"  ref="password" placeholder="密码" /></div>
            <div class="tip_error error_tip">{{error_tip}}</div>
            <div class="t3"><a class="login-btn" href="javascript:;" @click="login">登录</a></div>
            <div class="t4">
				<router-link  class="forgets " to="/forget">
                    忘记密码
                 </router-link>
			</div>
        </div>
    </div>
</div>

</template>
<script>
import '@/assets/css/login.css';
import bgAnimations from'./bgAnimation.js';

import Vue from 'vue';

export default {
  name: 'content',
  data () {
    return {
		error_tip:'',

    }
  },
  mounted () {
	bgAnimations();
			
  },
  watch(){
	
  },
  methods: {
		login(){
			if(this.$refs.username.value==''){
				this.error_tip='请输入用户名';
				return
			}else if(this.$refs.password.value==''){
				this.error_tip='请输入密码';
				return
			}
			this.login_data(function(data){
				console.log(data);
				
				this.$cookie.set('agtLayout',data.drpOpenapiLayout);
				this.$cookie.set('agtUId',data.drpOpenapiUId);
				this.$cookie.set('agtLoginId',data.drpOpenapiLoginId);
				this.$cookie.set('agtUsername',data.drpOpenapiUserName);
				this.$cookie.set('agtDistributorId',data.distributorId);
				this.$cookie.set('agtDiscount',data.discount);
				this.$cookie.set('agtIsTopDistributor',data.isTopDistributor);
				this.$cookie.set('agtDistributorName',data.distributorName);
				this.$cookie.set('agtDistributorId',data.distributorId);
				this.$router.push('/index');
			}.bind(this));
			
		},
		login_data(callback){
			this.$http.get("/api/staff/login",
			  {
				params: {
				  userName:this.$refs.username.value,
				  password:this.$refs.password.value,
				  role:'distributor'
				},
			  }).then(function(res){
				if(res.body.code=='failure'){
					this.error_tip=res.body.msg;
				}else{
					callback(res.body.data);
				}
			  },function(){
				this.error_tip='网络不给力，请稍后再试!'
			});
		}
  }
}
</script>
