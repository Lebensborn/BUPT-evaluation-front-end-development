<template>
  <div id="instructorPersonalInformation">
    <!--头部logo-->
    <div id="header">
        <div class="hrefButton">
            <el-button type="text" @click="hrefReturn">返回</el-button> |<el-button type="text" @click="hrefBoard">公示公告</el-button> |<el-button type="text" @click="hrefExit">退出登陆</el-button>
        </div>
    </div>
    <!--主体部分-->
    <el-tabs type="border-card" id="tabs">
        <el-tab-pane label="个人资料">
            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                label="账号"
                prop="userId"
                :rules="[
                { required: true, message: '账号不能为空'},
                ]"
            >
                <el-input type="string" v-model="numberValidateForm.userId" autocomplete="off" disabled= true></el-input>
            </el-form-item>

            <el-form-item
                class="header-input"
                label="姓名"
                prop="name"
                :rules="[
                { required: true, message: '姓名不能为空'},
                ]"
            >
                <el-input type="name" v-model="numberValidateForm.name" autocomplete="off" disabled= true></el-input>
            </el-form-item>

            <el-form-item
                label="管理班级"
                prop="classCharge"
                :rules="[
                { required: true, message: '班级不能为空'},
                ]"
            >
                <el-input type="class" v-model="numberValidateForm.classCharge" autocomplete="off" disabled= true></el-input>
            </el-form-item>

            <div v-show="doesChange">
                <el-form-item
                label="邮箱"
                prop="email"
                :rules="[
                { required: true, message: '邮箱不能为空'},
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
                >
                    <el-input type="email" v-model="numberValidateForm.email" autocomplete="off"  @keyup.enter.native="submitForm1" disabled= true></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="doesChange = !doesChange">修改邮箱</el-button>
                </el-form-item>
            </div>

            <div v-show="!doesChange">
                <el-form-item
                  label="绑定的邮箱"
                  prop="email"
                  :rules="[
                    { required: true, message: '邮箱不能为空'},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]"
                >
                  <el-input type="email" v-model="numberValidateForm.email" autocomplete="off"  @keyup.enter.native="submitForm1" class="forget-password-input-block-step-one"></el-input>
                </el-form-item>

                <el-form-item
                  label="邮箱验证码"
                  prop="code"
                  :rules="[
                    { required: true, message: '验证码不能为空'},
                  ]"
                >
                  <el-input type="text" v-model="numberValidateForm.code" autocomplete="off"  @keyup.enter.native="submitForm1" class="forget-password-input-block-step-one"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button @click.native.prevent="setCheakCode">点击获取验证码</el-button>
                  <el-button @click.native.prevent="checkCode">确定</el-button>
                </el-form-item>
            </div>

            <el-form-item>
                <el-button type="primary" @click="submitForm1">保存</el-button>
            </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
            <el-form :model="resetForm"  :rules="rules" ref="resetForm" label-width="100px" class="demo-ruleForm header-input">
                <el-form-item label="密码" prop="pass">
                    <el-input v-model="resetForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="resetForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm2">提交</el-button>
                </el-form-item>
            </el-form>
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
                classCharge: null,
                userId: null,
                email: null,
                code: null,
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
                    let data = JSON.parse(response.data);
                    let state = data.success;
                    if (state == true) {
                        //this.$store.commit("LoginInfoLogin", response.data.info);
                        this.$router.push("./instructor");
                        this.$message.success("重置密码成功！");
                        var arr = document.cookie.split("=");
                        this.$cookies.set(arr[0], arr[1], 60 * 60 * 24 * 7, "/");
                    } else {
                        this.$message.error(data.msg);
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
                    let data = JSON.parse(response.data);
                    let state = data.success;
                    if (state == true) {
                        //this.$store.commit("LoginInfoLogin", response.data.info);
                        //this.$router.push("/login");
                        this.$message.success("验证成功");
                        this.doesChange = !this.doesChange;
                    } else {
                        this.$message.error(data.msg);
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
            let data = JSON.parse(response.data);
            this.loading = false;
            if (data) {
                this.is_send = true;
                this.$message.success(
                "我们已向这个邮箱发送了一封验证邮件，请输入邮件中的验证码并重设您的密码"
                );
                //console.log(data)
            } else {
                this.$message.error("您还没有注册哦！");
            }
            })
            .catch(() => {
            this.loading = false;
            });
        },
        hrefReturn()
        {
            this.$router.push({path: './instructor'});
        },
        hrefExit()
        {
            this.$router.push({path: './'});
        },
        hrefBoard()
        {
            this.$router.push({path: './instructorBoard'});
        },
    },
    mounted: function() {
      var that = this;
      new Promise((resolve, reject) => {
        request({
          url: "/user/info/instructor",
          method: "get"
        })
          .then(response => {
            let data = JSON.parse(response.data);
            let state = data.success;
            if (state == true)
              console.log(data);
              that.numberValidateForm = data.personInfo;
          })
          .catch(error => {
            reject(error);
          });
      });
    }
}
</script>
 
<style scoped>
.header-input {
    margin-top: 30px;
}

.hrefButton {
    position: absolute;
    right: 10px;
    bottom: 0px;
}
#tabs {
    position: absolute;
    top: 130px;
    left: 30%;
    right: 30%;
}

#body {
    position: absolute;
    top: 94px; 
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

/*#footer {
  
}*/
</style>