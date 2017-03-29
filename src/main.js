// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResouse from 'vue-resource'
import VueCookie from 'vue-cookie'
import loading from '@/components/pages/common/loading.vue'
import tips from '@/components/pages/common/tips.vue'

Vue.use(VueResouse)
Vue.use(VueCookie)
Vue.use(loading)
Vue.use(tips)

Vue.config.productionTip = false;



router.beforeEach((to, from, next) => {

	next(); 
	
	if(!VueCookie.get('agtLayout') && to.path!='/forget'){
		next('/login');
	}
})

const vue=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
   data: {
    eventHub: new Vue()//广播事件
  }
})
