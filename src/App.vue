<template>
  <div id="app">
    <!-- 路由的出入口，路由的内容将被显示在这里 -->
    <router-view />
  </div>
</template> 
<style type="text/css">
</style>
<script>
//import request from "@/utils/request"; //打了大括号后显示找不到request函数
import Vue from "vue"
import VueResource from 'vue-resource'
Vue.use(VueResource);
export default {
  name: "App",
};
</script>
