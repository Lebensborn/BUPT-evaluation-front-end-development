<template>
  <div id="login">
    <!--头部logo-->
    <div id="header">
    </div>

    <!--主体部分-->
    <div id="body">
      <el-tabs type="border-card" stretch=true v-model="numberValidateForm.userType" @tab-click="changeUserType">
        <el-tab-pane label="学生登录" name="0">
          <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">

            <!--账号输入栏-->
            <el-form-item
              label="账号"
              prop="username"
              :rules="[
                { required: true, message: '账号不能为空'},
                { type: 'number', message: '账号必须为数字值'}
              ]"
            >
              <el-input type="text" v-model.number="numberValidateForm.username" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--密码输入栏-->
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="numberValidateForm.password" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--记住密码-->
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="numberValidateForm.checked" class="remember-password">记住密码</el-checkbox>
            
            <!--忘记密码-->
            <el-button type="text" @click="hrefForgetPassword" class="forget-password">忘记密码</el-button>

            <!--登录按钮-->
            <el-form-item>
              <el-button class="login-button" type="primary" @click="submitForm('numberValidateForm')" >登录</el-button>
            </el-form-item>              
          </el-form>            
        </el-tab-pane>
        <el-tab-pane label="辅导员登录" name="1">
          <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">

            <!--账号输入栏-->
            <el-form-item
              label="账号"
              prop="username"
              :rules="[
                { required: true, message: '账号不能为空'},
                { type: 'number', message: '账号必须为数字值'}
              ]"
            >
              <el-input type="text" v-model.number="numberValidateForm.username" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--密码输入栏-->
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="numberValidateForm.password" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--记住密码-->
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="numberValidateForm.checked" class="remember-password">记住密码</el-checkbox>
            
            <!--忘记密码-->
            <el-button type="text" @click="hrefForgetPassword" class="forget-password">忘记密码</el-button>

            <!--登录按钮-->
            <el-form-item>
              <el-button class="login-button" type="primary" @click="submitForm('numberValidateForm')" >登录</el-button>
            </el-form-item>              
          </el-form>            
        </el-tab-pane>
        <el-tab-pane label="管理员登录" name="2">
          <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">

            <!--账号输入栏-->
            <el-form-item
              label="账号"
              prop="username"
              :rules="[
                { required: true, message: '账号不能为空'},
                { type: 'number', message: '账号必须为数字值'}
              ]"
            >
              <el-input type="text" v-model.number="numberValidateForm.username" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--密码输入栏-->
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="numberValidateForm.password" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <!--记住密码-->
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="numberValidateForm.checked" class="remember-password">记住密码</el-checkbox>
            
            <!--忘记密码-->
            <el-button type="text" @click="hrefForgetPassword" class="forget-password">忘记密码</el-button>

            <!--登录按钮-->
            <el-form-item>
              <el-button class="login-button" type="primary" @click="submitForm('numberValidateForm')" >登录</el-button>
            </el-form-item>              
          </el-form>            
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--页脚部分留白--> 
    <div id="footer">
    </div>

  </div>
</template>
 
<script>

export default {
  data() {
    return {
      numberValidateForm: {
        //表单返回值
        username: '',
        password: null,
        userType: '0',
        //记住密码返回值
        checked: true,
      },
    };
  },

  methods: {
    //提交表单
    submitForm(formName) {   
    if (this._data.loading == true) return false; //防止重复点击
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          this.loading = true;
          this.$store
            .dispatch("Login", formName) //调用Login后返回了一个promise对象，后面的then是promise的方法
            .then(response => {
              that._data.loading = false;
              let state = response.data.success;
              if (state == true) {
                that._data.loading = false;
                that.$store.commit("LoginInfoLogin", response.data.info);
                var arr = document.cookie.split("=");
                that.$cookies.set(arr[0], arr[1], 60 * 60 * 24 * 7, "/")
              } else {
                that._data.loading = false;
                that.errorTip(response.data.msg);
              }
            })
            .catch(() => {
              that._data.loading = false;
            });
        } else {
          console.log("参数不合法！");
          return false;
        }
      });   
    },
    //跳转忘记密码
    hrefForgetPassword()
    {
      this.$router.push({path:'./forgetPassword-step-one'});
    },
  }
}
</script>
 
<style>
/*登录框*/
.box-card {
  position: absolute;
  top: 200px;
  right: 109px;
  width: 318px; 
  border-radius: 0px;
  height: 300px;
  background-color:rgba(255, 255, 255, 0.6);
  
}
/*登录按钮*/
.login-button {
  width: 260px;
}
/*记住密码按钮*/
.remember-password {
  right: 0px;
  padding-bottom: 15px;
}
/*忘记密码按钮*/
.forget-password {
  position: absolute;
  left: 232px;
  bottom: 95px;
}
/*按钮组*/
#selection {
  position: absolute;
  top: 160px;
  right: 29px;
  width: 400px;
}
/*账号密码输入框*/
.input-block {
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
</style>

<style scope>
/*主体*/
#body {
  position: absolute;
  top: 94px;
  right: 0px;
  left: 0px;
  height: 750px;
  background: url("../assets/登录界面背景图.jpg") no-repeat;
}
/*头部*/
#header {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  height: 94px;
  background: url("../assets/北邮logo.png") no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
/*尾部*/
#footer {
  position: absolute;
  right: 0px;
  left: 0px;
  bottom: 0px;
  height: 130px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>