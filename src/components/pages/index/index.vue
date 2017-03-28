<template>
	<div class="index">
		
		<div id="viewContainer">
		<div class="view">
		<div class="index_con flex flex-v">
		<dl class="index_header dl-horizontal">
			<dt>经销商名称：</dt><dd>{{distributorName}}</dd>
			<dt>经销商编码：</dt><dd>{{distributorId}}</dd>
		</dl>
		<div class="index_main flex flex-v">
			<div class="index_main_row flex">
				<div  class="index_main_cell flex flex-v" @click="router('imports')">
					<div class="index_imports flex"><i class="ico_imports"></i></div>
					<p>进货单管理</p>
				</div>
				<div class="index_main_cell flex flex-v" @click="router('order')">
					<div class="index_order flex"><i class="ico_order"></i></div>
					<p>订单</p>
				</div>
			</div>
			<div class="index_main_row flex">
				<div class="index_main_cell flex flex-v" @click="router('importsAdd')">
					<div class="index_imports_add flex"><i class="ico_imports_add"></i></div>
					<p>添加进货单</p>
				</div>
				<div class="index_main_cell flex flex-v" @click="router('my')">
					<div class="index_my flex"><i class="ico_my"></i></div>
					<p>我的</p>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>
	</div>
</template>
<script>

import router from '@/router';
export default {
  name: 'content',
  data () {
    return {
		distributorName:this.$cookie.get('agtDistributorName'),
		distributorId:this.$cookie.get('agtDistributorId'),

    }
  },
  mounted () {
  },
  methods: {
	router(url){
		router.push(url)
	}
  }
}
</script>
<style>
#viewContainer{position:absolute}
.index_con{position:absolute;top:0;left:0;right:0;bottom:0;}
.index_header{padding:15vw 4vw 5vw}
.index_main{-webkit-flex:1;flex:1;background:#fff;margin-top:5vw;}
.index_main_row{-webkit-flex:1;flex:1;}
.index_main_cell{-webkit-flex:1;flex:1;justify-content:center;align-items: center;}
.index_main_cell>div{width:30vw;height:30vw;border-radius:100vw;text-align:center;-webkit-flex-flow:column;flex-direction: column;justify-content: center;margin:0 auto;}
.index_main_cell>p{text-align:center;margin-top:2vw;color:#666;}
.index_main_cell i{color:#fff;font-size:12vw;    text-align: center;}
.index_imports{background:#f78181;}
.index_order{background:#cfa972;}
.index_imports_add{background:#669bd8;}
.index_my{background:#5ecfb8;}
</style>


