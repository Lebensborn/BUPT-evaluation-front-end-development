<template>
    <div id="instructorClassCommitteeScoring">
        <div id="header">
            <div class="hrefButton">
              <el-button type="text" @click="hrefReturnBackToInstructor">返回</el-button> |<el-button type="text" @click="hrefExit">退出</el-button> |<el-button type="text" @click="hrefBoard">公示公告</el-button>
            </div>
        </div>

        <el-card id="body">
              
        </el-card>
    </div>
</template>

<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数
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
.demo-ruleForm {
  margin-top: 30px;
}

#button-group {
  position: absolute;
  right: 30px;
  top: 20px;
}

#title {
  color: gray;
  font-size: 20px;
}

.hrefButton {
    position: absolute;
    right: 10px;
    bottom: 0px;
}

#header {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  height: 94px;
  background: url("../../assets/北邮logo.png") no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

#body {
    position: absolute;
    top: 130px;
    left: 15%;
    right: 15%;
}
</style>

