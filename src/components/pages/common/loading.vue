<script>

window.loading={};
window.loading.install = function (Vue, options) {
  let js_loading = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
					template: '<div class="spinner_container js_loading" id="js_loading">'+
								'<div class="spinner">'+
									'<div class="rect1"></div>'+
									'<div class="rect2"></div>'+			
									'<div class="rect3"></div>'+						
									'<div class="rect4"></div>'+
									'<div class="rect5"></div>'+
								'</div>'+				
							'</div>'
				});
  
	let tpl = new js_loading().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
  

  // 1. 添加事例方法
  Vue.prototype.$loading =  {
		show(){
			 document.body.appendChild(tpl);     
		},
		hide(){
		if(document.getElementsByClassName('js_loading').length>0)
		 document.body.removeChild(tpl);
		}
  }
  
 

}
module.exports=loading;

</script>



