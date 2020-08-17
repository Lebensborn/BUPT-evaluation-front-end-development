<template>
  <div id="instructorBoardApply">
    <!--头部logo-->
    <div id="header">
       <el-tabs id="return-button" >
            <el-button type="text" @click="hrefInstructorHomePage">首页</el-button>
            |
            <el-button type="text" @click="hrefInstructorBoard">公告公示</el-button>
            |
            <el-button type="text" @click="hrefReturn">退出登录</el-button>
        </el-tabs>
    </div>
    <!--主体部分-->
    <el-tabs type="border-card" id="main-form">
        <el-tab-pane label="公告名称1">
            
        </el-tab-pane>
        <el-tab-pane label="公告名称2">
            
        </el-tab-pane>
        <el-tab-pane label="公告名称3">
            
        </el-tab-pane>    
    </el-tabs>
    <!--页脚部分留白--> 
    <div id="footer">
    </div>
  </div>
</template>
 
<script>
import request from "@/utils/request"; //打了大括号后显示找不到request函数
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.resetForm.checkPass !== '') {
            this.$refs.resetForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            numberValidateForm: {
                name: null,
                instructorMajor: null,
                instructor: null,
                userId: null,
                email: null,
                code: null
            },
            resetForm: {
                pass: null,
                checkPass: null,
                //prePass: null
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                /*prePass: [
                    { validator: validatePass3, trigger: 'blur' }
                ]*/
            },
            doesChange: true
        }
    },
    methods: {
        hrefReturnBackToInstructor()
        {
            this.$router.push({path: './instructor'});
        },
        submitForm1() {
            if (this.loading == true) return false; //防止重复点击
            this.$message.success("保存成功！");
        },
        submitForm2() {
            if (this.loading == true) return false; //防止重复点击
            this.$refs.resetForm.validate(valid => {
                if (valid) {
                this.loading = true;
                this.$store
                    .dispatch("resetPassword", this.resetForm) //调用reset后返回了一个promise对象，后面的then是promise的方法
                    .then(response => {
                    this.loading = false;
                    let state = response.data.success;
                    if (state == true) {
                        //this.$store.commit("LoginInfoLogin", response.data.info);
                        this.$router.push("/instructor");
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

        checkCode(){
            if (this.loading == true) return false; //防止重复点击
            this.$refs.numberValidateForm.validate(valid => {
                if (valid) {
                this.loading = true;
                this.$store
                    .dispatch("checkCode", this.numberValidateForm) //调用reset后返回了一个promise对象，后面的then是promise的方法
                    .then(response => {
                    this.loading = false;
                    let state = response.data.success;
                    if (state == true) {
                        //this.$store.commit("LoginInfoLogin", response.data.info);
                        //this.$router.push("/login");
                        this.$message.success("验证成功");
                        this.doesChange = !this.doesChange;
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
        //发送邮箱验证码
        setCheakCode() {
        if (this.loading) return false;//防止重复点击
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!mailReg.test(this.numberValidateForm.email)) {
            this.$message.error("请输入正确的邮箱！");
            return false;
        }
        this.loading = true;
        this.$store
            .dispatch("setCheakCode1", this.numberValidateForm)
            .then(response => {
            this.loading = false;
            if (response.data) {
                this.is_send = true;
                this.$message.success(
                "我们已向这个邮箱发送了一封验证邮件，请输入邮件中的验证码并重设您的密码"
                );
                console.log(response.data)
            } else {
                this.$message.error("您还没有注册哦！");
            }
            })
            .catch(() => {
            this.loading = false;
            });
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
          url: "user/info",
          method: "get"
        })
          .then(response => {
            let state = response.data.success;
            if (state == true)
              console.log(response.data);
              that.numberValidateForm = response.data.personInfo;
          })
          .catch(error => {
            reject(error);
          });
      });
    }
}
</script>
 
<style scoped>
#main-form{
    position: absolute;
    top:94px;
    left:0px;
    right:0px;
}
#return-button{
    position: absolute;
    right:10px;
}

#body {
  position: absolute;
  top: 94px;
}

#header {
  position: absolute;
  right:0px;
  left:0px;
  top: 0px;
  height: 94px;
  background: url("../../assets/北邮logo.png") no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>