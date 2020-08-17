<template>
  <div>
      <h1>系统日志</h1>
      <p>测试页面！</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created: function() {
    if (this.$store.state.user.is_login == false)
      setTimeout(() => {
        //未登陆的的原因可能是用户一开始就访问了需要登录的网址，还没来得及加载状态，所以一旦检测到没登陆，延时等待看是不是状态还没返回，延时后还未登录就说明真没登陆了
        if (this.$store.state.user.is_login == false) {
          this.$message.error("您还未登录呢，快去登陆吧");
          this.$router.push("/");
        }
      }, 1500);
  },
};
</script>
<style scoped>

</style>