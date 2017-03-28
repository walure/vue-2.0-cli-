<template>
	
	<div class="subordinate_management_box" >
		<div class="subordinate_management" id="subordinate_management">
			<div class="search_box flex mb3">
				<input type="text"  ref="keyword" >
				<div class="btn search" @click="search">搜索</div>
				<div class="btn add"><router-link  to="/my/subordinate_management/add_business"><i class="ico_new_add"></i> 添加</router-link></div>
			</div>

			<pageScroll :options="pageData" :queryParms="queryParm"  ></pageScroll>

		</div>
		<router-view></router-view>
	</div>

</template>
<script>
import pageScroll from '@/components/pageScroll.vue'
export default {
  name: 'content',
  components:{pageScroll},
  data () {
    return {
		pageData:{
			url:'/api/distributor/subDistributor/list',
			tbCls:{
				distributorId:{name:'分销商编码',click:true,clickCall:function(d){
					console.log(d);
					this.$router.push({ path: '/my/subordinate_management/distributorInfo',query:{id:d.data.distributorId } });
				}.bind(this)},
				distributorName:{name:'分销商名称'},
				level:{name:'级别'},
				province:{name:'所属区域',text:{province:'province',city:'city'},txtLen:6}
			},
			queryParms:{},
			
		},
		queryParm:{}
    }
  },
  mounted  () {
	document.getElementById('my_index').style.display='none';
  },
  
  watch:{
	'$route' (to, from) {
		document.getElementById('my_index').style.display='none';
		document.getElementById('subordinate_management').style.display='block';
	}
  },
  methods: {
   search(){
		let distributorName=this.$refs.keyword.value || null;
		this.queryParm={distributorName:distributorName}
   }
  }
}
</script>
<style>
.subordinate_management{    padding-top: 12vw;}
.subordinate_management .search_box{line-height: 9vw;width: 96%;margin:5vw auto}
.subordinate_management input{flex: 3; border: 1px solid #D9D9D9;height: 8vw;outline: none; padding: 0 1vw}
.subordinate_management .search_box div{flex: 1; text-align: center;margin-left: 1vw;color: #fff; background: #f78181;border-radius: 1vw;}
.subordinate_management .search_box div a{color:#fff}
.subordinate_management .search_box .search:active{background: #da6d6d;}
.subordinate_management .search_box .add{ background: #669bd8;}
.subordinate_management .search_box .add:active{ background: #5e88bf;}



</style>


