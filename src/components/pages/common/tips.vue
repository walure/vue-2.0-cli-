<script>

window.tips={};
window.tips.install = function (Vue, options) {
  Vue.prototype.$tips=(tips)=>{
  
   if(document.getElementsByClassName('layer_hint').length){
            return;
       }
    let js_loading = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
					template: '<div class="layer_hint" style="top: 50%; left: 50%; visibility: visible; margin-left: -106px; margin-top: -35px;"><strong style="white-space:nowrap;">'+tips+'</strong></div>'
				});
  
	let tpl = new js_loading().$mount().$el; 
	document.body.appendChild(tpl);
	setTimeout(function(){
		document.body.removeChild(tpl);
	},2000)
  }
  
 

}
module.exports=tips;

</script>



