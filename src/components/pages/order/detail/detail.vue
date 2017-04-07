<template>
			<div class="order_detail">
					<dl class="dl-horizontal mb5">
						<dt>收件人：</dt><dd>{{result.shippingFullname}}</dd>
						<dt>联系方式：</dt><dd>{{result.shippingTelephone}}</dd>
						<dt>收件地址：</dt><dd>{{result.shippingRegion+result.address}}</dd>
					</dl>
					<div class="list_box">
						<div class="box">

							 <dl class="dl-horizontal mb5">
								<dt>进货单编号：</dt><dd>{{result.orderNo}}</dd>
								<dt>进货单状态：</dt><dd class="auditTxt">{{ result.auditStatus== 0 ? ( result.status== 2 ?  '已取消' :    '待审核') : result.auditStatus== 1 ? result.statusName : '审核不通过'  }}</dd>
								<dt>下单时间：</dt><dd>{{result.createTime}}</dd>
							</dl>
						</div>
						<div class="sub_table">
							<table class="table">
								<tr>
									<th>商品</th>
									<th>规格</th>
									<th>市场价</th>
									<th>数量</th>
								</tr>
								<tr v-for="item in result.products">
									<td>{{item['name']}}</td>
									<td>{{item['skuDesc']}}</td>
									<td>￥{{parseFloat(item['price']).toFixed(2)}}</td>
									<td>x{{item['quantity']}}</td>
								</tr>
							</table>
						</div>
					</div>
					<dl class="dl-horizontal ar">
						<dt>进货总额：</dt><dd>¥{{parseFloat(result.commodityPrice).toFixed(2)}}</dd>
						<dt>折扣：</dt><dd>{{result.distributorDiscount}}折</dd>
						<dt></dt><dd class="price_all">价格合计：¥{{parseFloat(result.orderPrice).toFixed(2)}}</dd>
					</dl>

					
					
					<div v-if="result.remark" class="box remark" >
						<div>备注：</div>
						<div class="border">无</div>
					</div>
					<div v-if="result.auditStatus!=0">
						<div class="check_btn_group flex" v-if="result.status==2">
							<span>通过</span>
							<span>不通过</span>
						</div>
					</div>
	</div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
		result:{}
    }
  },
  mounted () {
	this.initStyle();
	this.detailData();
  },
  watch:{
	'$route' (to, from) {
		this.initStyle();
	}
  },
  methods: {
	initStyle(){
		document.getElementById('order').style.display='none';
	},
	detailData(){
			this.$loading.show();
			var logUrl = '/api/distributorOrder/detail';
			var parm={
				distributorId:this.$cookie.get('agtDistributorId'),
				orderId:this.$route.query.orderId
			};
			this.$http.get(logUrl,
			  {
				params:parm,
			  }).then(function(res){
				if(res.body.code=='failure'){
					this.error_tip=res.body.msg;
				}else{
					console.log(res.body.data);
					this.result=res.body.data;
				}
				this.$loading.hide();
			  },function(){
				this.$tips('网络不给力，请稍后再试!');
				this.$loading.hide();
			});
	
	}
	
  },
}
</script>
<style>
.order_detail{padding:12vw 0 15vw;}
.order_detail .box{background: #fff; height: auto; overflow: hidden; word-break: break-all;padding: 3vw}
.order_detail .box .row{width: 100%; clear: both; padding-top: 2vw}

.order_detail  .list_box{padding-bottom:3vw;background: #fff;margin-bottom:5vw;}
.order_detail .list{ width: 96%; margin: auto ; height: auto; overflow: hidden;border-left:1px solid #ccc; border-top:1px solid #ccc; border-radius: 3px; background: #fff;}
.order_detail .list dl{width: 100%;flex-direction: row; display: flex; text-align: center;background: none;}
.order_detail .list  dl:nth-child(1){flex: 1; background: #0ABA7A; color: #fff}
.order_detail .list  dd{flex: 1;border-bottom: 1px solid #ccc;border-right: 1px solid #ccc; padding: 2vw;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.order_info{margin-top: 5vw}
.order_info div{height: auto;overflow: hidden;line-height: 8vw;border-bottom: 1px solid #ccc; }
.order_info div:last-child{border-bottom: none}

.finance_purchase_detail .remark{margin-top: 5vw}
.remark .border{width: 93%;padding:2vw;border:1px solid #ccc; margin-top: 2vw}

.order_detail .check_btn_group{width: 100%;line-height:15vw; color: #fff; text-align: center; position: fixed; bottom: 0;}
.check_btn_group span{flex: 1;background:#B96565}
.check_btn_group span:active{background: #DD6A6A}
.check_btn_group span:nth-child(1){background:#0ABA7A;}
.check_btn_group span:nth-child(1):active{background: #4F7FB6}

.popup{position: fixed; z-index: 99; background: rgba(0,0,0,0.5); top: 0;left: 0; width: 100%; height: 100%}
.popup .popup_box{width: 80%; height: 63vw;background: #fff;left: 0;right: 0;top: 0;bottom: 0; margin: auto;position: absolute; border-radius: 2vw; overflow: hidden}
.popup .title{text-align: center; line-height: 10vw}
.popup .content{text-align: center; }
.popup .content textarea{    width: 92%;    height: 35vw;    border: 1px solid #ccc;    border-radius: 1vw;    padding: 1vw;outline: none}
.popup .btn_group{margin-top: 3vw}
.popup .btn_group span{flex: 1; text-align: center;background: #DB5F5F; color: #fff; line-height: 12vw}
.popup .btn_group span:active{background: #b45252;}
.popup .btn_group span:nth-child(2){ background: #3675BC;}
.popup .btn_group span:nth-child(2):active{background: #326eb1;}


.sub_table{padding:0 3vw;}
.sub_table .table{border-left:1px solid #eee;border-right:1px solid #eee;}
.sub_table .table th:nth-child(2n){background:#0DAF74;}
.dl-horizontal dd.price_all{margin:2vw 0 0 0;padding-top:2vw;border-top:1px solid #eee;color:#f00;}
</style>


