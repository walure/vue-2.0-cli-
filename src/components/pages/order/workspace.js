define(["workCommon"],function(workCommon){
	var config = [{
		express:"index",
		title:"订单管理"
	},{
		express:"detail/:id",
		title:"订单详情"
	},{
		name:"index",
		express:"*filter",
		title:"订单管理"
	}];
	return workCommon(config);
});