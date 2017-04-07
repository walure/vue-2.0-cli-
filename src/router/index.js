import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import index from '@/components/pages/index/index.vue'
import imports from '@/components/pages/imports/index/imports.vue'
import importsDetail from '@/components/pages/imports/detail/detail.vue'
import importsAdd from '@/components/pages/imports/add/importsAdd.vue'
import order from '@/components/pages/order/index/order.vue'
import orderDetail from '@/components/pages/order/detail/detail.vue'
import my from '@/components/pages/my/my.vue'
import subordinateManagement from '@/components/pages/my/subordinate_management/subordinate_management.vue'
import add_business from '@/components/pages/my/add_business/add_business.vue'
import distributorInfo from '@/components/pages/my/detail/distributorInfo.vue'
import edit_distributorInfo from '@/components/pages/my/edit/edit_distributorInfo.vue'
import setting from '@/components/pages/my/setting/setting.vue'
import login from '@/components/pages/login/index/login.vue'
import forget from '@/components/pages/login/forget/forget.vue'
import setPassword from '@/components/pages/login/setPassword/setPassword.vue'

Vue.use(Router)
const routes=[
    {
      path: '/',
      component: index,
	   name: '首页',
	  meta: { title: '首页' }
    },
	{
      path: '/index',
      name: '首页',
      component: index
    },
	{
      path: '/imports',
      name: '进货单管理',
      component: imports,
	  children:[
				{
				  path: 'detail',
				  name: '进货单详情',
				  component: importsDetail,
				},
	 ]
    },	
	{
      path: '/importsAdd',
      name: '添加进货单',
      component: importsAdd
    },
	{
      path: '/order',
      name: '订单管理',
      component: order,
	  children:[
				{path:'detail', name: '订单详情',component:orderDetail},
				]
    },
	{
      path: '/my',
      name: '我的',
      component: my,
	  children:[
		{path:'subordinate_management', name: '下级管理',component:subordinateManagement,
			children:[
				{path:'add_business', name: '添加分销商',component:add_business},
				{path:'distributorInfo', name: '分销商详情',component:distributorInfo,
					children:[
						{path:'edit_distributorInfo', name: '编辑分销商1',component:edit_distributorInfo}
					]
				
				}
			]
		},
		{path:'setting', name: '设置',component:setting},
		]
    },
	{
      path: '/login',
      name: '登录',
      component: login
    },
	{
      path: '/forget',
      name: '发送短信',
      component: forget
    },
	{
      path: '/setPassword',
      name: '设置密码',
      component: setPassword
    },
	 {
      path: '*',
      component: index,
	  name: '首页',
    },
  ]

  
export default new Router({
 //mode: 'history',
  routes: routes,
  linkActiveClass:'curr',
  saveScrollPosition:true
})