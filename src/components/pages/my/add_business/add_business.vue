<template>

	<div class="add_business">
		<dl>
			<dd><div>经销商名称：</div><div><input type="text"></div></dd>
			<dd><div>所属区域：</div><div><input type="text" value=" " name="province" readonly="readonly"></div></dd>
			<dd><div>起始等级/折扣：</div><div><select><option>2级/5.8折</option></select></div></dd>
		</dl>
		<dl>
			<dt>基本信息</dt>
			<dd><div>负责人真实姓名：</div><div><input type="text"></div></dd>
			<dd><div>所属区域：</div><div><input type="text" value=" " name="info_province" readonly="readonly"></div></dd>
			<dd><div></div><div><input type="text"></div></dd>
			<dd><div>负责人联系电话：</div><div><input type="text"></div></dd>
		</dl>
		<dl>
			<dt>账号配置</dt>
			<dd><div>登陆账号：</div><div><input type="text"></div></dd>
			<dd><div>初始密码：</div><div><input type="text"></div></dd>
		</dl>
		<div class="btn">确定</div>
	</div>

</template>
<script>

import addressList from '@/js/ui/addressList.js'

export default {
  data () {
    return {
		level_data:[],
    }
  },
  mounted () {
	  document.getElementById('my_index').style.display='none';
	  document.getElementById('subordinate_management').style.display='none';
  
		var input =new addressList();
			input.load(this,function (city,d) {
				var selectArea = new city();
				selectArea.init({trigger:$('input[name=province]'),data:d,default:0,position:"bottom"});
				
				var selectArea1 = new city();
				selectArea1.init({trigger:$('input[name=info_province]'),data:d,default:0,position:"bottom"});
			
			});

		this.level()
  },
  watch:{
	'$route' (to, from) {
		document.getElementById('my_index').style.display='none';
		document.getElementById('subordinate_management').style.display='none';
	}
	},
  methods: {
		level(){
			this.$http.get("/api/distributor/level/list",
			  {
				params: {
				 drpOpenapiLoginId:this.$cookie.get('agtLoginId'),
				 distributorId:this.$cookie.get('agtDistributorId')
				},
			  }).then(function(res){
				if(res.body.code=='failure'){
					
				}else{
					this.level_data=res.body.data;
					console.log(this.level_data)
				}
			  },function(){
				
			});
		}
  }
}
</script>
<style>
.add_business{    padding-top: 12vw;}
.add_business dl{margin-bottom: 5vw;background: #fff;padding: 2vw 0 4vw;}
.add_business dl dd{display: flex;line-height: 9vw; margin-top: 2vw}
.add_business dl dd div{flex: 1;}
.add_business dl dd div:nth-child(1){flex: 2;text-align: right;    color: #666;}
.add_business dl dd div:nth-child(2){flex: 3}
.add_business dl dd input{border: 1px solid #e3e3e3;height: 8vw;outline: none; padding:0 1vw}
.add_business dl dd select{border: 1px solid #e3e3e3;height: 8vw;margin-right: 1vw}
.add_business dl dt{text-align: center;    color: #E54242;}
.add_business .btn{    line-height: 15vw;
    text-align: center;
    background: #669bd8;
    color: #fff;    position: fixed;
    width: 100%;
    bottom: 0;}
.add_business .btn:active{   background: #6291cb;}



</style>


