<template>
	<div class="index">
		<headers :titleInfo="titleInfo"></headers>
		<div id="viewContainer">
			<div class="view">
				

				<div class="order  ">
					<div class="select_box flex ">
						<span class="curr">全部</span>
						<span>已审核</span>
						<span>待审核</span>
						<span>未通过</span>
					</div>
					<table class="table weak">
						<tr>
							<th>订单编号</th>
							<th>应付金额</th>
							<th>订单状态</th>
						</tr>
						<tr>
							<td class="js_detail">12312123</td>
							<td>￥2332.00</td>
							<td class="red">待发货</td>
						</tr>
						<tr>
							<td class="js_detail">22312123</td>
							<td>￥2332.00</td>
							<td>已发货</td>
						</tr>
						<tr>
							<td class="js_detail">32312123</td>
							<td>￥2332.00</td>
							<td class="green">已完成</td>
						</tr><tr>
							<td class="js_detail">42312123</td>
							<td>￥2332.00</td>
							<td class="red">待发货</td>
						</tr>
						<tr>
							<td class="js_detail">52312123</td>
							<td>￥2332.00</td>
							<td class="red">待发货</td>
						</tr>
						<tr>
							<td class="js_detail">62312123</td>
							<td>￥2332.00</td>
							<td class="red">待发货</td>
						</tr>
						<tr>
							<td class="js_detail">72312123</td>
							<td>￥2332.00</td>
							<td>已发货</td>
						</tr>
						<tr>
							<td class="js_detail">82312123</td>
							<td>￥2332.00</td>
							<td class="green">已完成</td>
						</tr><tr>
							<td class="js_detail">92312123</td>
							<td>￥2332.00</td>
							<td class="red">待发货</td>
						</tr>
					</table>
					<div class="more">已显示全部</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
import headers from '@/components/pages/header/header.vue';
export default {
 components: { headers},
  name: 'content',
  data () {
    return {
		titleInfo:{
			name:'订单',
			titleBlock:'block'
		}
    }
  },
  created () {
  },
  methods: {
   
  }
}
</script>
<style>
.select_box{background: #0ABA7A; color: #fff; text-align: center;}
.select_box span{flex: 1;display: block ;line-height: 13vw; margin-top: 1px}
.select_box .curr{background: #fff; color: #787878;font-weight: bold}
</style>


