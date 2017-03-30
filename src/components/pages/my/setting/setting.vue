<template>

	<div class="setting">
		<div class="change_password">
			修改密码
		</div>
		<div class="exit" @click="exit">
			退出
		</div>
	</div>

</template>
<script>
export default {
  name: 'content',
  data () {
    return {
    }
  },
   mounted  () {
	this.initStyle();
  },
  methods: {
	initStyle(){
		document.getElementById('my_index').style.display='none';
	},
	exit(){
		this.$confirm({content:'确认退出?',btn:2,okCallback:function(){
			this.$cookie.delete('agtDiscount');
			this.$cookie.delete('agtDistributorId');
			this.$cookie.delete('agtDistributorName');
			this.$cookie.delete('agtIsTopDistributor');
			this.$cookie.delete('agtUId');
			this.$cookie.delete('agtUsername');
			this.$cookie.delete('agtLoginId');
			this.$cookie.delete('agtLayout');
			this.$router.push({path:'/login'});
		}.bind(this)});
	}
  }
}
</script>
<style>


.setting{padding-top:12vw}
.setting .change_password{padding-left: 3%; border-bottom:1px solid #eee; line-height: 15vw;    font-size: 4.6vw;}
.setting .exit{    background: #B96565;line-height: 15vw;color: #fff;text-align: center;position: fixed; bottom: 0; width: 100%}
.setting .exit:active{background: #a75858;}

</style>


