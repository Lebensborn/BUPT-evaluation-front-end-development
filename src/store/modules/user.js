import {
    login,
    SetCheakCode1,
    SetCheakCode2,
    ResetPassword,
    ForgetPassword,
} from "@/api/login"
import {
    CheckCode
} from "@/api/changeInfo"
/* // 当只有一个参数时，圆括号是可选的：
(singleParam) => {
    statements
}
singleParam => {
    statements
}
// 没有参数的函数应该写成一对圆括号。
() => {
    statements
} */
const user = {
    state: {
        userInfo: {
            "email": null,
            "userId": null,
            'userType': null,
            "password": null,
            "code": null,
            "validCode": null,
            "pass": null,
            "checkPass": null,
        },
    },
    mutations: {
        signOut(state) {
            state.userInfo = {
                "email": null,
                "userId": null,
                'userType': 0,
                "password": null,
            };
            state.is_login = false;
        },
        //忘记密码模块将数据存入state
        LoginInfoLogin1(state, info) { 
            state.userInfo.userId = info.userId;
            state.userInfo.validCode = info.validCode;
            console.log(state.userInfo);
        },
        LoginInfoLogin2(state, info) { 
            state.userInfo.pass = info.pass;
            console.log(state.userInfo);
        },
    },
    actions: {
        // 登录    
        Login({commit /* 传入commit函数下面调用了commit */}, formName) {//定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用      
            return new Promise((resolve, reject) => { //封装一个 Promise 
                /*console.log(formName.userId);
                console.log(formName.password);
                console.log(formName.userType);*/
                login(formName.userId, formName.password, formName.userType).then(response => { //使用 login 接口进行网络请求   
                    commit('') //提交一个 mutation，通知状态改变          
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //发送重置密码时的验证码
        setCheakCode1({
            commit
        }, numberValidateForm) {
            return new Promise((resolve, reject) => {
                SetCheakCode1(numberValidateForm.email).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //忘记密码发送验证码
        setCheakCode2({
            commit
        }, numberValidateForm) {
            return new Promise((resolve, reject) => {
                SetCheakCode2(numberValidateForm.userId).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //重设密码并登录
        resetPassword({commit}, form) {
            return new Promise((resolve, reject) => {
                ResetPassword(form).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //检查用户界面验证码
        checkCode({commit}, form){
            return new Promise((resolve, reject) => {
                CheckCode(form).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //忘记密码
        forgetPassword({commit}, form) {
            return new Promise((resolve, reject) => {
                ForgetPassword(form).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default user