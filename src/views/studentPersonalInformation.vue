<template>
  <div id="studentBoardApply">
    <!--头部logo-->
    <div id="header">
       <el-tabs id="return-button" >
            <el-button type="text" @click="hrefStudentHomePage">首页</el-button>
            |
            <el-button type="text" @click="hrefStudentBoard">公告公示</el-button>
            |
            <el-button type="text" @click="hrefReturn">退出登录</el-button>
        </el-tabs>
    </div>
    <!--主体部分-->
    <el-tabs type="border-card" id="main-form">
        <el-tab-pane label="个人资料">
            <p>修改个人资料</p>
            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                label="姓名"
                prop="name"
                :rules="[
                { required: true, message: '姓名不能为空'},
                ]"
            >
                <el-input type="name" v-model="numberValidateForm.name" autocomplete="off" disabled= true></el-input>
            </el-form-item>

            <el-form-item
                label="学号"
                prop="number"
                :rules="[
                { required: true, message: '学号不能为空'},
                ]"
            >
                <el-input type="number" v-model="numberValidateForm.number" autocomplete="off" disabled= true></el-input>
            </el-form-item>

            <el-form-item
                label="班级"
                prop="class"
                :rules="[
                { required: true, message: '班级不能为空'},
                ]"
            >
                <el-input type="class" v-model="numberValidateForm.class" autocomplete="off" disabled= true></el-input>
            </el-form-item>

            <el-form-item
                label="辅导员"
                prop="teacher"
                :rules="[
                { required: true, message: '姓名不能为空'},
                ]"
            >
                <el-input type="teacher" v-model="numberValidateForm.teacher" autocomplete="off" disabled= true></el-input>
            </el-form-item>

            <el-form-item
                label="绑定的邮箱"
                prop="email"
                :rules="[
                { required: true, message: '邮箱不能为空'},
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]"
            >
                <el-input type="email" v-model="numberValidateForm.email" autocomplete="off"  @keyup.enter.native="submitForm('numberValidateForm')"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('numberValidateForm')">保存</el-button>
            </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原始密码" prop="prePass">
                    <el-input v-model.number="ruleForm.prePass"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
            numberValidateForm: {
                name: '',
                class: '',
                teacher: '',
                number: '',
                email: '',
            },
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                prePass: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        hrefReturnBackToStudent()
        {
            this.$router.push({path: './student'});
        },
        submitForm(formName) {
            if (this.loading == true) return false; //防止重复点击
            this.$refs[formName].validate(valid => {
                if (valid) {
                this.loading = true;
                this.$store
                    .dispatch("resetPassword", formName) //调用reset后返回了一个promise对象，后面的then是promise的方法
                    .then(response => {
                    this.loading = false;
                    let state = response.data.success;
                    if (state == true) {
                        this.$store.commit("LoginInfoLogin", response.data.info);
                        this.$router.push("/login");
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
}
</script>
 
<style>
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
</style>

<style scope>
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
  background: url("../assets/北邮logo.png") no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}


/*#footer {
  
}*/
</style>