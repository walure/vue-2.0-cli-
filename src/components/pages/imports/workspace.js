define(["workCommon"],function(workCommon){
	var config = [{
		express:"index",
		title:"进货单管理"
	},{
		express:"add",
		title:"添加进货单"
	},{
		express:"confirm",
		title:"确认订货单"
	},{
		express:"detail/:id",
		title:"进货单详情"
	},{
		name:"index",
		express:"*filter",
		title:"进货单管理"
	}];
	return workCommon(config);
});