<template>
	<div class="my">
		<div id="viewContainer">
			<div class="view">
				<div class="my_index" id="my_index" >
					<dl class="dl-horizontal ar">
						<dt>经销商名称</dt><dd>{{distributorName}}</dd>
						<dt>经销商编码</dt><dd>{{distributorId}}</dd>
						<dt>经销商等折/扣级</dt><dd>{{level_discount}}</dd>
						<dt>所属区域</dt><dd>{{area}}</dd>
					</dl>
					<dl class="dl-horizontal ar">
						<dt>负责人姓名</dt><dd>{{distributorMgrName}}</dd>
						<dt>负责人联系方式</dt><dd>{{distributorMgrPhone}}</dd>
						<dt>通讯地址</dt><dd>{{address}}</dd>
					</dl>
					<dl class="dl-horizontal ar">
						<dt>登录账号</dt><dd>{{username}}</dd>
						<dl><router-link  to="/my/subordinate_management"><dt class="">下级管理</dt><dd class=""><span class="ico_right"> </span></dd></router-link></dl>
						<dl><router-link  to="/my/setting"><dt class="setting">设置</dt><dd class="setting"><span class="ico_right"> </span></dd></router-link></dl>
					</dl>
				</div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
import headers from '@/components/pages/header/header.vue';
export default {
  name: 'content',
  data () {
    return {
			distributorName:'',
			distributorId:'',
			level_discount:'',
			area:'',
			distributorMgrName:'',
			distributorMgrPhone:'',
			address:'',
			username:''
    }
  },
  mounted () {
	
		this.my_data(function(data){
			this.distributorName=data.distributorName;
			this.distributorId=data.distributorId;
			this.level_discount=data.level+'级/'+data.discount/10+'折';
			this.area=data.provinceArea+data.cityArea+data.districtArea;
			this.distributorMgrName=data.distributorMgrName;
			this.distributorMgrPhone=data.distributorMgrPhone;
			this.address=data.province+data.city+data.district+data.address;
			this.username=data.username;
		}.bind(this))
  },
  watch:{
	'$route' (to, from) {
		document.getElementById('my_index').style.display='block';
	}
  },
  methods: {
   my_data(callback){
			this.$http.get("/api/distributor/get",
			  {
				params: {
				 drpOpenapiLoginId:this.$cookie.get('agtLoginId'),
				 distributorId:this.$cookie.get('agtDistributorId')
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
<style>
.my_index{padding-top:12vw;}
.my_index dl{margin-bottom:3vw;}
</style>


