<template>
   <div>
        <div id="header">
            <el-button type="text" @click="hrefReturnBackToStudent">返回</el-button> |<el-button type="text" @click="hrefApplyBoard">申请公示公告</el-button> |<el-button type="text" @click="hrefExit">退出登录</el-button>
        </div>
        <h2 style="margin-top: 96px;">公示公告</h2>
        <hr>
        <div id="content">
            {{ numberValidateForm.title }}<br>
            {{ numberValidateForm.startPubTime }}-{{ numberValidateForm.endPubTime }}<br>
            {{ numberValidateForm.content }}

        </div>
   </div>
</template>

<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数

export default {
    data() {
        return {
            numberValidateForm: [],
        }
    },
    methods:{
        hrefReturnBackToStudent()
        {
            this.$router.push({path: './student'});
        },

        hrefExit()
        {
            this.$router.push({path: './'});
        },
        hrefApplyBoard()
        {
            this.$router.push({path: './studentBoardApply'});
        },
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
    mounted: function() {
      var that = this;
      new Promise((resolve, reject) => {
        request({
          url: "/notification?disqualify=false",
          method: "get"
        })
          .then(response => {
            let data = JSON.parse(response.data);
            let state = data.success;
            if (state == true)
              console.log(data);
              that.numberValidateForm = data.notification;
              this.is_get = true;
          })
          .catch(error => {
            reject(error);
          });
      });  
    }
}
</script>

<style scoped>
#header {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  height: 94px;
  background: url("../../assets/北邮logo.png") no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>