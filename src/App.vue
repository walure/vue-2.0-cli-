
<template>
  <div id="app">
	<headers></headers>
   <router-view> </router-view>
  </div>
</template>
<script>
import './assets/css/public.css'
import headers from '@/components/pages/header/header.vue';
export default {
 components: { headers},
  name: 'app'
}
</script>

<style>
#app{height:100%}
</style>
