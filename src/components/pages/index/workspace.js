define(["workCommon"],function(workCommon){
	var config = [{
		express:"index",
		title:"主页"
	},{
		name:"index",
		express:"*filter",
		title:"主页"
	}];
	return workCommon(config);
});