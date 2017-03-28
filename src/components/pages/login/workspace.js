define(["workCommon"],function(workCommon){
	var config = [{
		express:"index",
		title:"登录"
	},{
		express:"forget",
		title:"重置密码"
	},{
		express:"setPassword/:phone/:code",
		title:"重置密码"
	},{
		name:"index",
		express:"*filter",
		title:"登录"
	}];
	return workCommon(config);
});