<template>
			<div class="distributorInfo_box">
				<div class="distributorInfo" id="distributorInfo">
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
				   <div class="delete_distributorInfo_btn" @click="delete_distributorInfo"> 删除</div>
				   <div class="edit_distributorInfo_btn" @click="edit_distributorInfo"> 编辑</div>
				</div>
			</div>
			<router-view ></router-view>
		</div>
</template>
<script>
import headers from '@/components/pages/header/header.vue';
export default {
  name: 'content',
  data () {
    return {
			id:this.$route.query.id,
			distributorName:'',
			distributorId:'',
			level_discount:'',
			area:'',
			distributorMgrName:'',
			distributorMgrPhone:'',
			province:'',
			city:'',
			district:'',
			address1:'',
			address:'',
			username:'',
			level:'',
			discount:''
    }
  },
  mounted () {
		this.initStyle();
		this.my_data(function(data){
			this.draw(data);
		}.bind(this))
  },
  watch:{
	'$route' (to, from) {
		this.initStyle();
		if(to.query.id){
				this.my_data(function(data){
				this.draw(data);
			}.bind(this))
		}
		
	}
  },
  methods: {
	initStyle(){
		document.getElementById('my_index').style.display='none';
		document.getElementById('subordinate_management').style.display='none';
		document.getElementById('distributorInfo').style.display='block';
	},
	draw(data){
			this.distributorName=data.distributorName;
			this.distributorId=data.distributorId;
			this.level_discount=data.level+'级/'+data.discount/10+'折';
			this.level=data.level;
			this.discount=data.discount;
			this.area=data.provinceArea+' '+data.cityArea+' '+data.districtArea;
			this.distributorMgrName=data.distributorMgrName;
			this.distributorMgrPhone=data.distributorMgrPhone;
			this.province=data.province;
			this.city=data.city;
			this.district=data.district;
			this.address1=data.address;
			this.address=data.province+data.city+data.district+data.address;
			this.username=data.username;
	},
   my_data(callback){
			this.$loading.show();
			this.$http.get("/api/distributor/get",
			  {
				params: {
				 drpOpenapiLoginId:this.$cookie.get('agtLoginId'),
				 distributorId:this.$route.query.id
				},
			  }).then(function(res){
				if(res.body.code=='failure'){
					this.tips(res.body.msg || res.body.errorMsg);
				}else{
					callback(res.body.data);
				}
				this.$loading.hide();
			  },function(){
				this.$loading.hide();
				this.error_tip='网络不给力，请稍后再试!'
			});
	},
	edit_distributorInfo(){
		this.$router.push({ path: '/my/subordinate_management/distributorInfo/edit_distributorInfo',query:{data:JSON.stringify(this._data)}});
	},
	delete_distributorInfo(){
		this.$confirm({content:'确认删除?',btn:2,okCallback:function(){
			this.delete_data(function(){
				this.$root.eventHub.$emit('eventName', '子组件通知父组件改变');
				this.$router.back();
			}.bind(this));
			
		}.bind(this)});
	},
	delete_data(callback){
			this.$http.get("/api/distributor/del",
			  {
				params: {
				 drpOpenapiLoginId:this.$cookie.get('agtLoginId'),
				 distributorId:this.$route.query.id
				},
			  }).then(function(res){
				if(res.body.code=='failure'){
					this.$tips(res.body.msg || res.body.errorMsg);
				}else{
					callback(res.body.data);
				}
			  },function(){
				this.$tips('网络不给力，请稍后再试!');
			});
	},
	
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


