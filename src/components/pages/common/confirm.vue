<script>
window.confirm={};
window.confirm.install = function (Vue, options) {
  Vue.prototype.$confirm=(options)=>{
    let confirm_wrapper = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
					template: '<div class="confirm_wrapper"  style="z-index: 99998; display: block;"><div class="confirm_tb">'+
								'<div class="confirm_cell">'+
									'<div class="confirm">'+
										'<h2>提示<i class="icon-remove fr confirm_remove">X</i></h2>'+
										'<div class="confirm_content">'+options.content+'</div>'+
										'<div class="confirm_btns">'+
												'<a class="confirm_cancel confirm_remove" href="javascript:;">取消</a>'+
												'<a class="confirm_ok" id="confirm_ok" href="javascript:;">确定</a>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'</div>'
				});
 
	let tpl = new confirm_wrapper().$mount().$el; 
	document.body.appendChild(tpl);
	let confirmRemove= document.getElementsByClassName('confirm_remove');
	
	for(var i=0;i<confirmRemove.length;i++){
		confirmRemove[i].onclick=function(){
			document.body.removeChild(tpl);
		}
	}
	document.getElementById('confirm_ok').onclick=function(){
		options.okCallback();
		document.body.removeChild(tpl);
	}
  }
}
module.exports=confirm;

</script>



