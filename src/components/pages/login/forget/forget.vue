<template>
	<div  class="forget login_box">
	  <header class="header">
		<div class="go_back" onclick="history.back()"></div>
		<div class="page_title">密码重置</div>
	</header>
	<div class="whole">

		<div class="login-form">
			<div class="user-name common-div">
				<input type="tel" name="username" maxlength="11"  value="" placeholder="手机号码" />
			</div>
			<div class="user-yzm common-div">
				<input type="text" name="yzm" value="" placeholder="验证码" />
				<span class="sendCode">发送验证码</span>
			</div>
			<div class="login-btn common-div submit">下一步</div>
			<div class="error_tip"></div>
		</div>

	</div>
</div>

</template>
<script>
import '@/assets/css/forget.css'
export default {
  name: 'content',
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
