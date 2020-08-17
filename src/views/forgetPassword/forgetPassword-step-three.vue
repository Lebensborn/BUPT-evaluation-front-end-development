<template>
  <div id="forget-password">
      <!--头部-->
      <div id="header">
        <el-button type="text" @click="herfReturn" id="return-button">返回登陆界面</el-button>
      </div>

      <!--主体部分-->
      <div id="body">
        <el-row id="first-line">
          <el-col :span="8" :offset="8">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="8">
            <el-card id="forget-password-card">
              <!--进度条-->
              <el-steps :active="3" finish-status="success" simple style="margin-top: 20px; margin-bottom: 50px;">
                <el-step title="验证身份" ></el-step>
                <el-step title="重置密码" ></el-step>
                <el-step title="重置成功" ></el-step>
              </el-steps>

              <!--表单内容-->
                <el-form :model="resetForm"  ref="resetForm" label-width="100px" class="demo-ruleForm">
                    <div id="change-success">
                        修改成功！
                    </div>
                    <el-button type="primary" @click="submitForm" id="forget-password-next-step-step-three">返回</el-button>
                </el-form>    
            </el-card>
          </el-col>
        </el-row>
      </div>

      
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      resetForm: {
        userId: null,
        code: null,
        password: null,
      }
    };
  },
  created: function(){
    this.resetForm = {
      userId: this.$store.state.user.userInfo.userId,
      code: this.$store.state.user.userInfo.validCode,
      password: this.$store.state.user.userInfo.pass,
    }
  },
  methods: {
    herfReturn()
    {
      this.$router.push({path: './'});
    },
    submitForm() {
      if (this.loading == true) return false; //防止重复点击
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("forgetPassword", this.resetForm) //调用reset后返回了一个promise对象，后面的then是promise的方法
            .then(response => {
              this.loading = false;
              let data = JSON.parse(response.data);
              let state = data.success;
              console.log(data)
              if (state == true) {
                //this.$store.commit("LoginInfoLogin", response.data.info);
                this.$router.push("./");
                this.$message.success("重置密码成功！");
                var arr = document.cookie.split("=");
                this.$cookies.set(arr[0], arr[1], 60 * 60 * 24 * 7, "/");
              } else {
                this.$message.error(response.data.msg);
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数不合法！");
          return false;
        }
      });
    },
  }
};
</script>

<style scoped>
/*返回登录界面*/ 
#return-button {
  position: absolute;
  right: 5px;
  bottom: 0px;
}
/*界面中的卡片样式*/
#forget-password-card {
  left: auto;
  right: auto;
  width: 600px;
}
/*第一行栅格-作用：调整卡片与顶的距离*/
#first-line {
  height: 100px;
}
/*下一步按钮*/
#forget-password-next-step-step-three {
  width: 360px;
  margin-left: 105px;
  margin-top: 70px;
  margin-bottom: 50px;
}
/*输入框*/
.forget-password-input-block {
  width: 360px;
} 
/*修改成功*/
#change-success {
    margin-left: 250px;
    margin-top: 70px;
} 

#body {
  position: absolute;
  top: 94px;
  right: 0px;
  left: 0px;
  height: 750px;
  background: url("../../assets/登陆界面背景图.jpg") no-repeat;
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

#footer {
  position: absolute;
  right: 0px;
  left: 0px;
  bottom: 0px;
  height: 130px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>