<template>
	
				<div class="distributorInfo">
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
					
					</dl>
				
				<div class="btn_group">
				   <div class="delete_distributorInfo_btn"> 删除</div>
				   <div class="edit_distributorInfo_btn"> 编辑</div>
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
		console.log(this.$router)
	  document.getElementById('my_index').style.display='none';
  document.getElementById('subordinate_management').style.display='none';
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
			document.getElementById('my_index').style.display='none';
		document.getElementById('subordinate_management').style.display='none';
	}
  },
  methods: {
   my_data(callback){
   
   
			this.$http.get("/api/distributor/get",
			  {
				params: {
				 drpOpenapiLoginId:this.$cookie.get('agtLoginId'),
				 distributorId:this.$route.query.id
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
.distributorInfo{padding-top:12vw;}
.distributorInfo dl{margin-bottom:3vw;}
.distributorInfo .btn_group{
    line-height: 15vw;
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;}
.distributorInfo div{float: left;}
.distributorInfo .btn_group .delete_distributorInfo_btn{ background: #A1A1A1;width: 40%;}
.distributorInfo .btn_group .edit_distributorInfo_btn{    background: #0ABA7A;width: 60%;}
</style>


