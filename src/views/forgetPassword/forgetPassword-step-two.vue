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
              <el-steps :active="2" finish-status="success" simple style="margin-top: 20px; margin-bottom: 50px;">
                <el-step title="验证身份" ></el-step>
                <el-step title="重置密码" ></el-step>
                <el-step title="重置成功" ></el-step>
              </el-steps>

              <!--表单内容-->
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="请输入新密码" prop="pass">
                    <el-input v-model="ruleForm.pass" autocomplete="off" class="forget-password-input-block-step-two" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" autocomplete="off" class="forget-password-input-block-step-two" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm" id="forget-password-next-step">下一步</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!--尾部-->
      <div id="footer">

      </div>
  </div>
</template>
<script>
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: null,
          checkPass: null,
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        if (this.loading == true) return false; //防止重复点击
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.commit("LoginInfoLogin2", this.ruleForm);
            this.$router.push("/forgetPassword-step-three");
          } else {
            console.log("参数不合法！");
            return false;
          }
        });
      },
      //回到主页
      herfReturn()
      {
        this.$router.push({path: './login'})
      }
    }
  }
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
#forget-password-next-step {
  width: 360px;
}
/*输入框*/
.forget-password-input-block-step-two {
  width: 400px;
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