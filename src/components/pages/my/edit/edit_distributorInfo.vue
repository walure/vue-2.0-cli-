<template>

	<div class="eidt_distributorInfo">
		<dl>
			<dd><div>经销商名称：</div><div><input readonly :value="querys.distributorName" ref="distributorName" type="text"></div></dd>
			<dd><div>所属区域：</div><div><input type="text" :value="querys.area"  value="" ref="distributorArea" name="province" readonly="readonly"></div></dd>
			<dd><div>起始等级/折扣：</div><div >
				<select ref="level">
					<option  :value="querys.level" >{{querys.level}}级/{{querys.discount/10}}折</option>
				</select>
			</div></dd>
		</dl>
		<dl>
			<dt>基本信息</dt>
			<dd><div>负责人真实姓名：</div><div><input  :value="querys.distributorMgrName"  ref="distributorMgrName" type="text"></div></dd>
			<dd><div>所属区域：</div><div><input type="text" :value="querys.province+' '+querys.city+' '+querys.district" ref="distributorMgrArea" name="info_province" readonly="readonly"></div></dd>
			<dd><div></div><div><input type="text" :value="querys.address1" ref="address"></div></dd>
			<dd><div>负责人联系电话：</div><div><input :value="querys.distributorMgrPhone"  ref="distributorMgrPhone" type="text"></div></dd>
		</dl>
		<dl>
			<dt>账号配置</dt>
			<dd><div>登陆账号：</div><div><input ref="username" readonly :value="querys.username" type="text"></div></dd>
			<dd><div>初始密码：</div><div><input ref="password" readonly :value="querys.username" type="password"></div></dd>
		</dl>
		<div class="btn" @click="submit">确定</div>
	</div>

</template>
<script>

import addressList from '@/js/ui/addressList.js'

export default {
  data () {
    return {
		querys:{}
    }
  },
  mounted () {
		this.loadData();
		
		this.setCity();
		this.initStyle();
  },
  watch:{
	'$route' (to, from) {
		this.initStyle();
	}
	},
  methods: {
		loadData(){
			this.querys=JSON.parse(this.$route.query.data);
		},
		initStyle(){
			document.getElementById('my_index').style.display='none';
			document.getElementById('subordinate_management').style.display='none';
			setTimeout(function(){document.getElementById('distributorInfo').style.display='none';},0)
		},
		submit(){
			let distributorName=this.$refs.distributorName.value,
			 distributorCity= this.$refs.distributorArea.value ? this.$refs.distributorArea.value.split(' ') : [],
			 level=this.$refs.level.value,
			 distributorMgrName=this.$refs.distributorMgrName.value,
			 infoCity=this.$refs.distributorMgrArea.value ? this.$refs.distributorMgrArea.value.split(' '):[],
			 address=this.$refs.address.value,
			 distributorMgrPhone=this.$refs.distributorMgrPhone.value,
			 username=this.$refs.username.value,
			 password=this.$refs.password.value,
			 tip='';
			if(distributorName==''){
				tip='经销商名称不能为空!';
			}else if(distributorCity.length==0){
				tip='请选择经销商所在省市区!';
			}else if(!distributorCity[1]){
				tip='请选择经销商所在市!';
			}else if(!distributorCity[2]){
				tip='请选择经销商所在区!';
			}else if(distributorMgrName==''){
				tip='负责人真实姓名不能为空!';
			}else if(infoCity.length==0){
				tip='请选择负责人所在省市区!';
			}else if(!infoCity[1]){
				tip='请选择负责人所在市!';
			}else if(!infoCity[2]){
				tip='请选择负责人所在区!';
			}else if(address==''){
				tip='负责人详细地址不能为空!';
			}else if(distributorMgrPhone==''){
				tip='负责人手机号码不能为空!';
			}else if(!/^1\d{10}$/g.test($.trim(distributorMgrPhone))){
				tip='请输入正确的手机号码!';
			}else if(username==''){
				tip='用户名不能为空!';
			}else if(/[\W]/g.test(username)){
				tip='用户名只能是数字或英文!';
			}else if(password==''){
				tip='初始密码不能为空!';
			}else if(password.length<6){
				tip='初始密码不能小于6位!';
			}
			
			if(tip){
				this.$tips(tip)
				return;
			}			
			this.$http.get("/api/distributor/update",
			  {
				params:{
					parentId:this.$cookie.get('agtDistributorId'),
					distributorName:distributorName,
					level:level,
					provinceArea:distributorCity[0],
					cityArea:distributorCity[1],
					districtArea:distributorCity[2],
					distributorMgrName:distributorMgrName,
					province:infoCity[0],
					city:infoCity[1],
					district:infoCity[2],
					address:address,
					distributorMgrPhone:distributorMgrPhone,
					username:username,
					password:password,
				},
			  }).then(function(res){
				if(res.body.code=='failure'){
					this.$tips(res.body.msg|| res.body.errorMsg)
				}else{
					this.$root.eventHub.$emit('eventName', '子组件通知父组件改变');
					this.$router.back();
				}
			  },function(){
				
			});
		},
		setCity(){
			var input =new addressList();
			input.load(this,function (city,d) {
				var selectArea = new city();
				selectArea.init({trigger:$('input[name=province]'),data:d,default:0,position:"bottom"});
				var selectArea1 = new city();
				selectArea1.init({trigger:$('input[name=info_province]'),data:d,default:0,position:"bottom"});
			
			});
		},
  }
}
</script>
<style>
.eidt_distributorInfo{    padding-top: 12vw;}
.eidt_distributorInfo dl{margin-bottom: 5vw;background: #fff;padding: 2vw 0 4vw;}
.eidt_distributorInfo dl dd{display: flex;line-height: 9vw; margin-top: 2vw}
.eidt_distributorInfo dl dd div{flex: 1;}
.eidt_distributorInfo dl dd div:nth-child(1){flex: 2;text-align: right;    color: #666;}
.eidt_distributorInfo dl dd div:nth-child(2){flex: 3}
.eidt_distributorInfo dl dd input{border: 1px solid #e3e3e3;height: 8vw;outline: none; padding:0 1vw}
.eidt_distributorInfo dl dd select{border: 1px solid #e3e3e3;height: 8vw;margin-right: 1vw}
.eidt_distributorInfo dl dt{text-align: center;    color: #E54242;}
.eidt_distributorInfo .btn{    line-height: 15vw;
    text-align: center;
    background: #669bd8;
    color: #fff;    position: fixed;
    width: 100%;
    bottom: 0;}
.eidt_distributorInfo .btn:active{   background: #6291cb;}



</style>


