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
              <el-steps :active="1" finish-status="success" simple style="margin-top: 20px; margin-bottom: 50px;" >
                <el-step title="验证身份" ></el-step>
                <el-step title="重置密码" ></el-step>
                <el-step title="重置成功" ></el-step>
              </el-steps>

              <!--表单内容-->
              <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm"  :rules="loginRules">
                <el-form-item
                  label="账号"
                  prop="userId"
                  :rules="[
                    { required: true, message: '账号不能为空'},
                    { type: 'number', message: '账号必须为数字值'}
                  ]"
                >
                  <el-input type="text" v-model.number="numberValidateForm.userId" autocomplete="off"  @keyup.enter.native="submitForm" class="forget-password-input-block-step-one"></el-input>
                </el-form-item>
                
                 <el-radio-group v-model="numberValidateForm.userType" id="selection-group">
                  <el-radio-button label='0' >学生</el-radio-button>
                  <el-radio-button label='1'>辅导员</el-radio-button>
                </el-radio-group>

                <el-row>
                  <el-col :span="10">
                    <el-form-item label="验证码" prop="code">
                        <el-input type="text" auto-complete="off" v-model="numberValidateForm.code" @keyup.enter.native="submitForm">
                        </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" style="margin-left: 20px">
                    <div class="login-code" @click="refreshCode">
                      <v-sidentify :identifyCode="identifyCode"></v-sidentify>
                    </div>
                  </el-col>
                </el-row>

                <el-form-item
                  label="绑定的邮箱"
                  prop="email"
                  :rules="[
                    { required: true, message: '邮箱不能为空'},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]"
                >
                  <el-input type="email" v-model="numberValidateForm.email" autocomplete="off"  @keyup.enter.native="submitForm" class="forget-password-input-block-step-one"></el-input>
                </el-form-item>

                <el-form-item
                  label="邮箱验证码"
                  prop="validCode"
                  :rules="[
                    { required: true, message: '验证码不能为空'},
                  ]"
                >
                  <el-input type="text" v-model="numberValidateForm.validCode" autocomplete="off"  @keyup.enter.native="submitForm" class="forget-password-input-block-step-one" id="valid-code-input"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button @click.native.prevent="setCheakCode" id="email-valid-code-input">点击获取验证码</el-button>
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
import Sidentify from '../../components/identify'  //**引入验证码组件**
export default {
  data() {
    const validateCode = (rule, value, callback) => {
        if (this.identifyCode !== value) {
          this.numberValidateForm.code = ''
          this.refreshCode()
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
    return {
      numberValidateForm: {
        userId: null,
        email: null,
        code: null,
        validCode: null,
        userType: 0,
      },
      identifyCode: '',
      identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyz',

      loginRules: {
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: validateCode, trigger: 'blur' }
          ]
        }
    };
  },
  created() {
      this.refreshCode()
  },
  mounted (){
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  components: {
      'v-sidentify':Sidentify
    },
  methods: {
    herfReturn()
    {
      this.$router.push({path: './'});
    },
    submitForm() {
      if (this.loading == true) return false; //防止重复点击
      this.$refs.numberValidateForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.commit("LoginInfoLogin1", this.numberValidateForm);
          this.$router.push("/forgetPassword-step-two");
        } else {
          console.log("参数不合法！");
          return false;
        }
      });
    },
    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ];
      }
    },
    setCheakCode() {
      if (this.loading) return false;//防止重复点击
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!mailReg.test(this.numberValidateForm.email)) {
        this.$message.error("请输入正确的邮箱！");
        return false;
      }
      this.loading = true;
      this.$store
        .dispatch("setCheakCode2", this.numberValidateForm)
        .then(response => {
          this.loading = false;
          if (response.data) {
            this.is_send = true;
            this.$message.success(
              "我们已向这个邮箱发送了一封验证邮件，请输入邮件中的验证码并重设您的密码"
            );
          } else {
            this.$message.error("您还没有注册哦！");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  }
};
</script>

<style scoped>
#email-valid-code-input {
  margin-top: 10px;
  margin-left: 0px;
}

#selection-group {
  margin-left: 100px;
  margin-bottom: 15px;
}
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
.forget-password-input-block-step-one {
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
#valid-code-input {
  width: 200px;
  margin-right: 200px;
}
</style>

<style lang="scss" scoped>
  .container {
    margin-top: 160px;
  }
  .login-code {
    cursor: pointer;
    .login-code-img {
      width: 100px;
      height: 38px;
      background-color: #eee;
      border: 1px solid #f0f0f0;
      color: #333;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      text-indent: 2px;
      text-align: center;
    }
  }
</style>