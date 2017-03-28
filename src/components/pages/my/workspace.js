define(["workCommon"],function(workCommon){
	var config = [{
		express:"index",
		title:"我的"
	},{
		express:"subordinate_management",
		title:"下级管理"
	},{
		express:"add_business",
		title:"添加经销商"
	},{
		express:"setting",
		title:"设置"
	},{
		name:"index",
		express:"*filter",
		title:"我的"
	}];
	return workCommon(config);
});