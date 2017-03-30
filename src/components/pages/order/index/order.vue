<template>
		
			<div id="viewContainer">
				<div class="view">
				<div class="order  ">
					<div class="select_box flex ">
						<span @click="select_table(0)" :class="curr[0]">已审核</span>
						<span @click="select_table(1)" :class="curr[1]">待审核</span>
						<span @click="select_table(2)" :class="curr[2]">未通过</span>
					</div>
					<div class="table_con js_table_con1" :style="show[0]" >
						<pageScroll :options="pageData" :queryParms="queryParm1"  ></pageScroll>
					</div>
					<div class="table_con js_table_con2" :style="show[1]">
						<pageScroll :options="pageData" :queryParms="queryParm2"  ></pageScroll>
					</div>
					<div class="table_con js_table_con3" :style="show[2]">
						<pageScroll :options="pageData" :queryParms="queryParm3"  ></pageScroll>
					</div>
					
				</div>
		</div>
</div>


</template>
<script>
import pageScroll from '@/components/pageScroll.vue'
export default {
  name: 'order',
  components:{pageScroll},
  data () {
    return {
	pageData:{
			url:'/api/distributorOrder/list',
			tbCls:{
				orderNo:{name:'进货单编号',click:true,clickCall:function(d){
					console.log(d);
					this.$router.push({ path: '/order/detail',query:{id:d.data.distributorId } });
				}.bind(this)},
				orderPrice:{name:'应付金额',type:'price'},
				shipStatus:{name:'进货单状态',className:'imports_status check_box',format:{5:'<i class="green">已审核</i>',1:'<i class="red">审核中</i>',2:'已取消',10:'<i class="red">审核不通过</i>'}}
		
			},
			queryParms:{},
			
		},
		queryParm1:{drpOpenapiLoginId:this.$cookie.get('agtLoginId'),auditStatus:1},
		queryParm2:{drpOpenapiLoginId:this.$cookie.get('agtLoginId'),auditStatus:0,nostart:true},
		queryParm3:{drpOpenapiLoginId:this.$cookie.get('agtLoginId'),auditStatus:2,nostart:true},
		curr:['curr'],
		show:['','display:none','display:none']
		
    }
  },
  mounted () {
  },
  methods: {
   select_table(type){
	this.curr=[];
	this.curr[type]='curr';
	for(var i in this.show){
		this.show[i]='display:none';
	}
	this.show[type]='';
	if(type==1){
		this.queryParm2.nostart=false;
	}
	if(type==2){
		this.queryParm3.nostart=false;
	}
   
   }
  }
}
</script>
<style>
.order{padding-top:12vw}
.select_box{background: #0ABA7A; color: #fff; text-align: center;}
.select_box span{flex: 1;display: block ;line-height: 13vw; margin-top: 1px}
.select_box .curr{background: #fff; color: #787878;font-weight: bold}
</style>


