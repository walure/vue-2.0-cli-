<template>
	<div class="index">
		<div id="viewContainer">
			<div class="view">
			
					<div class="setting">
						<div class="change_password">
							修改密码
						</div>
						<div class="exit">
							退出
						</div>
					</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'content',
  data () {
    return {
		titleInfo:{
			name:'下级管理',
			titleBlock:'block',
			back:'block'
		}
    }
  },
   mounted  () {
	document.getElementById('my_index').style.display='none';
  },
  methods: {
   
  }
}
</script>
<style>


.setting{}
.setting .change_password{padding-left: 3%; border-bottom:1px solid #eee; line-height: 15vw;    font-size: 4.6vw;}
.setting .exit{    background: #B96565;line-height: 15vw;color: #fff;text-align: center;position: fixed; bottom: 0; width: 100%}
.setting .exit:active{background: #a75858;}

</style>


