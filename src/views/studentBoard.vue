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

<style>
#header {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  height: 94px;
  background: url("../assets/北邮logo.png") no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>