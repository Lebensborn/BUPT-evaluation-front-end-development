<template>
  <div id="login">
    <!--头部logo-->
    <div id="header">
      <el-button type="text" @click="hrefStudentHomePage" id="return-button">首页</el-button>
      |
      <el-button type="text" @click="hrefStudentPublicAnnouncement" id="return-button">公告公示</el-button>
      |
      <el-button type="text" @click="hrefLogout" id="return-button">退出登录</el-button>
    </div>

    <!--主体部分-->
    <div id="body">
      <!--功能选择器-->
      <div>
        <el-radio-group v-model="label" id="selection">
          <el-button type="info" label="个人资料" plain id="information">个人资料</el-button>
          <el-button type="info" label="修改密码" plain id="reset">修改密码</el-button>
        </el-radio-group>
      </div>


      <el-card class="box-card" >
        <div class="text item" id="text-box">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <!--新密码输入栏-->
            <el-form-item
              label="新密码"
              prop="newPassword"
              :rules="[
                { required: true, message: '新密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off" class="reset-password-input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--新密码重复输入栏-->
            <el-form-item
              label="确认新密码"
              prop="confirmNewPassword"
              :rules="[
                { required: true, message: '新密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="ruleForm.confirmNewPassword" autocomplete="off" class="reset-password-input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--保存按钮-->
            <el-form-item>
              <el-button id="login-button" type="primary" @click="submitForm('numberValidateForm')" >保存</el-button>
            </el-form-item>              
          </el-form>            
        </div>
      </el-card>        
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
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.confirmNewPassword !== '') {
            this.$refs.ruleForm.validateField('confirmNewPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          newPassword: '',
          confirmNewPassword: ''
        },
        rules: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmNewPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        if (this.loading == true) return false; //防止重复点击
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.commit("setUserItemList", formName);
            this.$router.push("/forgetPassword-step-3");
          } else {
            console.log("参数不合法！");
            return false;
          }
        });
      },


    hrefStudentHomePage()
    {
      
      this.$router.push({path:'./studentHomePage'});
      this.$router.go(0);
    },

    hrefStudentPublicAnnouncement()
    {
      
      this.$router.push({path:'./studentPublicAnnouncement'});
      this.$router.go(0);
    },

    hrefLogout()
    {
      
      this.$router.push({path:'./login'});
      //执行退出指令
      this.$router.go(0);
    },
  }
}
</script>
 
<style>
/*输入框*/
.box-card {
  position: absolute;
  top: 200px;
  right: 109px;
  width: 318px; 
  border-radius: 0px;
  height: 300px;
  background-color:rgba(255, 255, 255, 0.6);
  
}
/*保存按钮*/
#save-button {
  width: 260px;
}
/*按钮组*/
#selection {
  position: absolute;
  top: 160px;
  right: 29px;
  width: 400px;
}
/*密码输入框*/
.reset-password-input-block {
  left: 0px;
  width: 210px;
}
/*套在card内层的div*/ 
#text-box {
  margin-top: 30px;
  margin-left: 10px;
}
/*错误提示*/
.el-form-item__error {
  left: 50px;
} 
/*三个按钮*/ 
#student {
  border-radius: 0px;
  width: 107px;
  background-color:rgba(255, 255, 255, 0.6);
  color: #606266;
}

#teacher {
  border-radius: 0px;
  margin-left: 0px;
  width: 107px;
  background-color:rgba(255, 255, 255, 0.6);
  color: #606266;
}

#admin {
  border-radius: 0px;
  margin-left: 0px;
  width: 107px;
  background-color:rgba(255, 255, 255, 0.6);
  color: #606266; 
}

#student:focus {
  border-radius: 0px;
  width: 107px;
  background-color:rgba(0, 0, 0, 0.6);
  color: #ffffff;
}

#teacher:focus {
  border-radius: 0px;
  margin-left: 0px;
  width: 107px;
  background-color:rgba(0, 0, 0, 0.6);
  color: #ffffff;
}

#admin:focus {
  border-radius: 0px;
  margin-left: 0px;
  width: 107px;
  background-color:rgba(0, 0, 0, 0.6);
  color: #ffffff;
}
</style>

<style scope>
#body {
  position: absolute;
  top: 94px;
  right: 0px;
  left: 0px;
  height: 750px;
}

#header {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  height: 94px;
  background: url("../assets/北邮logo.png") no-repeat;
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