<template>
  <div id="login">
    <!--头部logo-->
    <div id="header">
    </div>

    <!--主体部分-->
    <div id="body">
      <el-tabs type="border-card" :stretch=true v-model="numberValidateForm.userType" id="box-card">
        <el-tab-pane label="学生登陆" name="0">
          <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">

            <!--账号输入栏-->
            <div class="userId">
              <el-form-item
                label="账号"
                prop="userId"
                :rules="[
                  { required: true, message: '账号不能为空'},
                  { type: 'number', message: '账号必须为数字值'}
                ]"
              >
                <el-input type="text" v-model.number="numberValidateForm.userId" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
            </div>

            <!--密码输入栏-->
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="numberValidateForm.password" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            
            <!--忘记密码-->
            <el-button type="text" @click="herfForgetPassword" class="forget-password">忘记密码</el-button>

            <!--登陆按钮-->
            <el-form-item>
              <el-button class="login-button" type="primary" @click="submitForm" >登录</el-button>
            </el-form-item>              
          </el-form>            
        </el-tab-pane>
        <el-tab-pane label="辅导员登陆" name="1">
          <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">

            <!--账号输入栏-->
            <div class="userId">
              <el-form-item
                label="账号"
                prop="userId"
                :rules="[
                  { required: true, message: '账号不能为空'},
                ]"
              >
                <el-input type="text" v-model="numberValidateForm.userId" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
            </div>

            <!--密码输入栏-->
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="numberValidateForm.password" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            
            <!--忘记密码-->
            <el-button type="text" @click="herfForgetPassword" class="forget-password">忘记密码</el-button>

            <!--登陆按钮-->
            <el-form-item>
              <el-button class="login-button" type="primary" @click="submitForm" >登录</el-button>
            </el-form-item>              
          </el-form>            
        </el-tab-pane>
        <el-tab-pane label="管理员登陆" name="2">
          <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">

            <!--账号输入栏-->
            <div class="userId">
              <el-form-item
                label="账号"
                prop="userId"
                :rules="[
                  { required: true, message: '账号不能为空'},
                ]"
              >
                <el-input type="text" v-model="numberValidateForm.userId" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
            </div>

            <!--密码输入栏-->
            <el-form-item
              label="密码"
              prop="password"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
            >
              <el-input type="password" v-model="numberValidateForm.password" autocomplete="off" class="input-block" clearable @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            
            <!--忘记密码-->
            <el-button type="text" @click="herfForgetPassword" class="forget-password">忘记密码</el-button>

            <!--登陆按钮-->
            <el-form-item>
              <el-button class="login-button" type="primary" @click="submitForm" >登录</el-button>
            </el-form-item>              
          </el-form>            
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
 
<script>

export default {
  data() {
    return {
      numberValidateForm: {
        //表单返回值
        userId: null,
        password: null,
        userType: 0,
        //记住密码返回值
      },
    };
  },
  methods: {
    //提交表单
    submitForm() {  
    if (this._data.loading == true) return false; //防止重复点击
      this.$refs.numberValidateForm.validate(valid => {
        if (valid) {
          var that = this;
          this.loading = true;
          this.$store
            .dispatch("Login", this.numberValidateForm) //调用Login后返回了一个promise对象，后面的then是promise的方法
            .then(response => {
              that._data.loading = false;
              let data = JSON.parse(response.data);
              let state = data.success;
              if (state == true) {
                that._data.loading = false;
                //console.log(response.data);
                that.$store.commit("checkLogin");

                if(this.numberValidateForm.userType == 0)
                  that.$router.push({path: './student'});
                else if(this.numberValidateForm.userType == 1)
                  that.$router.push({path: './instructor'});
                else
                  that.$router.push({path: './admin'});
                  
                var arr = document.cookie.split("=");
                that.$cookies.set(arr[0], arr[1], 60 * 60 * 24 * 7, "/");
              } else {
                if(response.data.msg == '用户不存在')
                {
                  this.$message.error("用户不存在");
                }
                else
                {
                  this.$message.error("用户名或密码错误");
                }
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
    herfForgetPassword()
    {
      this.$router.push({path:'./forgetPassword-step-one'});
    },
  }
}
</script>
 
<style scoped>
/*登录框*/
#box-card {
  position: absolute;
  top: 200px;
  right: 109px;
  width: 320px; 
  border-radius: 0px;
  height: 325px;
  background-color:rgba(255, 255, 255, 0.6);
  
}
/*登陆按钮*/
.login-button {
  width: 260px;
  margin-left: 15px;
  margin-top: 30px;
}

.userId {
  margin-top: 30px;
}
/*忘记密码按钮*/
.forget-password {
  position: absolute;
  bottom: 83px;
  left: 230px;
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
  
  width: 225px;
}
/*套在card内层的div*/ 
#text-box {
  margin-top: 30px;
  margin-left: 10px;
}


/*主体*/
#body {
  position: absolute;
  top: 94px;
  right: 0px;
  left: 0px;
  height: 750px;
  background: url("../assets/登陆界面背景图.jpg") no-repeat;
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
/*错误提示*/
.el-form-item__error/deep/ {
  left: 50px;
}
</style>