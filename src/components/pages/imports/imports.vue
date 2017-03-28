<template>
	<div class="index">
		<div id="viewContainer">
			<div class="view">
				<div class="finance_purchase  ">
				<div class="select_box flex flex-v">
					<div>
						<select>
							<option>全部</option>
							<option>已审核</option>
							<option>待审核</option>
							<option>未通过</option>
						</select>
					</div>
					<div>
						<select>
							<option>全部</option>
							<option>待发货</option>
							<option>待收货</option>
							<option>已完成</option>
							<option>已取消</option>
							<option>退换货</option>
						</select>
					</div>
					<router-link  to="/importsAdd" class="btn ico_new_atd">进货
					</router-link>
					<!--<div class="btn ico_new_atd"> 进货</div>-->
				</div>
				<table class="table">
					<tr>
						<th>进货单编号</th>
						<th>应付金额</th>
						<th>进货单状态</th>
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
						<td class="js_detail">72312123</td>
						<td>￥2332.00</td>
						<td>已发货</td>
					</tr>
					<tr>
						<td class="js_detail">82312123</td>
						<td>￥2332.00</td>
						<td class="green">已完成</td>
					</tr>
				</table>
				<div class="more">已显示全部</div>
			</div>

			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'content',
  data () {
    return {
		titleInfo:{
			name:'进货单管理',
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
#viewContainer{position:absolute}
.finance_purchase .select_box {padding:5vw 0;flex-direction: row;height: auto; overflow: hidden; background: #fff;}
.select_box div{width: 40vw;margin-left:3vw; line-height: 10vw }
.select_box div select{width: 100%;height: 10vw;text-align: center;    border: 1px solid #e3e3e3;color:#666;background:#efefef;}
.select_box .btn{width: 25vw; margin-right: 5vw; text-align: center; background:#0FAB72; color: #fff; border-radius: 1vw;margin-left: 3vw;line-height: 10vw}

</style>


