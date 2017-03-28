define(["workCommon"],function(workCommon){
	var config = [{
		express:"index",
		title:"首页"
	},{
		express:"subordinate_management",
		title:"下级管理"
	},{
		express:"add_business",
		title:"添加经销商"
	},{
		express:"detail",
		title:"详细页"
	},{
		name:"index",
		express:"*filter",
		title:"首页"
	}];
	return workCommon(config);
});