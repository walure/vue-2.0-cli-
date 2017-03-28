<template>
	<div  class="setPassowrd login_box">
		 <header class="header">
		<div class="go_back" onclick="history.back()"></div>
		<div class="page_title">重置密码</div>
	</header>
	<div class="whole">

		<div class="login-form">

		   <div class="user-pasw common-div ">
				<input type="password" name="password" value="" placeholder="请输入密码" />
			   <i class="icon_eye_open"></i>
			</div>
			<div class="user-pasw common-div">
				<input type="password" name="password1" value="" placeholder="请再次输入密码" />
				<i class="icon_eye_open"></i>
			</div>
			<div class="login-btn common-div submit">重置密码</div>
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
