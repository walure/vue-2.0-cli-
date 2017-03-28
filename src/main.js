// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResouse from 'vue-resource'
import VueCookie from 'vue-cookie'

Vue.use(VueResouse)
Vue.use(VueCookie)

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
  components: { App }
})
