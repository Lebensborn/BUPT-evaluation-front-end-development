<template>
  <div id="app">
    <!-- 路由的出入口，路由的内容将被显示在这里 -->
    <router-view />
  </div>
</template> 
<style type="text/css">
</style>
<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数
export default {
  name: "App",
  mounted: function() {
    var that = this;
    new Promise((resolve, reject) => {
      request({
        url: "userInfo/info",
        method: "get"
      })
        .then(response => {
          let state = response.data.success;
          if (state == true)
            that.$store.commit("LoginInfoLogin", response.data.info);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
</script>
