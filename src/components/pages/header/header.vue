<template>
<div class="content" :style="menu_show">
  <div class="header">
    <div class="menu_info" :class="{menu_go_left1:menu_go_left.menu_go_left}"  @click="menu_box_hide()">
        <div class="title" >{{titles}} </div>
        <div class="go_back" :style="back_shade"  @click="backs"></div>

    </div>
    <div class="menu_box " :class="menu_go_left">
        <div class="logo">   欢迎 ,admin <!--  <a href="login.html">退出</a>--></div>
        <div class="menu_ico" @click="menu_box()">
        </div>
    </div>
    <div class="tool_bar"></div>
    <nav class="left_menu ico_txt"  :class="menu_go_left">
        <ul class="left_menu_ul ">
            <li class="left_menu_li">
				<router-link class="nav_txt"  :to="{ path: 'index', params: { deviceId: 123, dataId:456 }}" >
					<i class="ico_home"></i>
					<span>主页</span>
				</router-link>
              
            </li>
            <li class="left_menu_li">
			<a class="nav_txt" >
					<i class="ico_imports"></i>
                    <span>进货</span>
			</a>
                <ul class="sec_ul">
                    <li>
						<router-link   to="/imports">
                            <span>进货单管理</span>
                        </router-link>
                    </li>
                    <li>
                       <router-link  to="/importsAdd">
                            <span>添加进货单</span>
                         </router-link>
                    </li>
                </ul>
            </li>

            <li class="left_menu_li">
				 <router-link  class="nav_txt " to="/order">
                    <i class="ico_order"></i>
                    <span>订单</span>
                 </router-link>
            </li>
            <li class="left_menu_li">
			 <router-link  class="nav_txt " to="/my">
                    <i class="ico_my"></i>
                    <span>我的</span>
                 </router-link>
            </li>

        </ul>
    </nav>
    <div class="bg_shade" @click="menu_box_hide()" style="display: none" :style="bg_shade"></div>
  </div>
  
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'content',
  data () {
    return {
		titles:document.title,
		menu_go_left:{
				'menu_go_left':false,
				'menu_go_left1':false,
				'menu_go_left2':false
		},
		bg_shade:{
			'display':'none'
		},	
		back_shade:{
			'display':'none'
		},
		menu_show:{
			'display':'block'
		},
		show(){
			this.menu_go_left['menu_go_left']=true;
			this.menu_go_left['menu_go_left1']=true;
			this.menu_go_left['menu_go_left2']=true;
			this.bg_shade['display']='block';
			document.getElementById('viewContainer').className='menu_go_left3' 
		},
		hide(){
			this.menu_go_left['menu_go_left']=false;
			this.menu_go_left['menu_go_left1']=false;
			this.menu_go_left['menu_go_left2']=false;
			this.bg_shade['display']='none';
			document.getElementById('viewContainer').className=''
		},
		setView(to){
			console.log(to);
			if(to.path=='/login' || to.path=='/forget' || to.path=='/setPassword'){
				this.menu_show['display']='none';
			}else{
				this.menu_show['display']='block';
				this.hide();
				
			}

			document.title=to.name;
			this.titles=to.name;
			if(to.matched.length>1 || to.path=='/importsAdd'){
				this.back_shade['display']='block';
			}else{
				this.back_shade['display']='none';
			}
		}
    }
  },
  created () {
  },
  mounted(){
		this.setView( this.$route);
  },
  watch:{
	'$route' (to, from) {
	
		this.setView(to);
	}
  },
  methods: {
    menu_box (event) {
		if(this.menu_go_left['menu_go_left']){
			this.hide();
		}else{
			this.show();
		}
    },
	menu_box_hide (){
		this.hide();
	},
	backs (){ 
		history.back()
	}
  }
}
</script>

