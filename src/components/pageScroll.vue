<template>
<div id="page">
 <table class="table">
	 <tbody>
	 <tr><th  v-for="item in tbCls">{{item['name']}}</th> </tr>
	 <tr v-for="( item,k ) in result"> 
		<td  v-for="(key,dataItem,index)  in tbCls"  @click='eidt({index:index,click:key.click,data:item,clickCall:key.clickCall})'>
			<span v-if="key.text">
				<span  v-for="dataItems  in key.text">{{item[dataItems]}}</span>
			</span>
			<span  v-else-if="key.type === 'price'">
				{{('￥'+(item[dataItem]/100).toFixed(2))}}
			</span>	
			<span v-html="key.format[item[dataItem]]"  v-else-if="key.format">
				{{key.format[item[dataItem]]}}
			</span>
			<span v-else>
				{{item[dataItem]}}
			</span>	
		
		</td>	 
	 </tr> 
	 </tbody>
 </table>
 <div class="more">{{load_txt}}</div>
 </div>
</template>
import {cookieSet} from '@/js/cookie.js';
<script>
export default {
  name: 'content',
  props:["options","queryParms"],
  data () {
    return {
		url:this.options.url ,
		page:this.page || 1,
		pageSize:this.pageSize || 20,
		queryParm:this.queryParms ,
		tbCls:this.options.tbCls || {},
		loadSuccess:this.loadSuccess || function () {},
		isLoad:false,
		result:[],
		load_txt:'数据加载中...',
		search_res:false
    }
  },
  watch:{
	'queryParms.nostart'(val){
		this.isLoad=false;
		this.search_res=true;
		this.load({loading:'show'});
	},
	queryParms(val){
		
		this.queryParm=val
		this.isLoad=false;
		this.search_res=true;
		this.load();
			
	},
	options(val){
		console.log(val)
	}
	
  },
  mounted  () {
	this.load();
	this.pageScroll();
  },
  methods: {
	load (data){
			if(this.isLoad || this.queryParm.nostart) return;
			this.pageList(data);
		},
  	pageScroll () {
			var w=document.body;
			window.onscroll=function(){
				if(w.scrollTop+ w.clientHeight >= w.clientHeight && this.scrollFlag && this.isScrollLoading){
					this.page++;
					this.pageList();
				}
			}.bind(this);
	},
  	eidt (data) {
		if(data.click){
		 data.clickCall ? data.clickCall(data) : '';
		}
	},
	pageList (data) {
			if(data){
				if(data.loading){
					this.$loading.show();
				}
			}
			this.load_txt='数据加载中...';
			this.listData(function (d) {
				if(data){
				if(data.loading){
					this.$loading.hide();
				}
			}
				this.isLoad=true;
				if(d.length<this.pageSize){
					this.scrollFlag=false;
				}else{
					this.isScrollLoading=true;
					this.scrollFlag=true;
				}
				if(this.search_res &&  this.page==1){
					this.result=d;
				}else{	
				this.result=this.result.concat(d);
				}
				if(d.length==0 && this.page==1){
					this.load_txt='暂无数据';
				}else if(d.length<this.pageSize){
					
					this.load_txt='已显示全部';
				}else{
					this.load_txt='';
					
				}
				this.loadSuccess();
			}.bind(this))
		},
	listData(callback){
			this.isScrollLoading=false;
			var logUrl = this.url;
			var parm={
				distributorId:this.$cookie.get('agtDistributorId'),
				page:this.page,
				pageSize:this.pageSize,
			};
			var queryParm=this.queryParm;
			for(var i in queryParm){
				if(queryParm[i]!=='') parm[i]=queryParm[i];
			}
			this.$http.get(logUrl,
			  {
				params:parm,
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
  },
  destroyed(){
	window.onscroll='';
  }
}
</script>
