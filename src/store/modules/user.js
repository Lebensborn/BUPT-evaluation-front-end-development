import {
    login,
    SetCheakCode,
    ResetPassword
} from "@/api/login"
import {
    Register,
    RegisterCheck
} from "@/api/register"
import {
    changeInfo
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
            "email": "",
            "username": "",
            "qq": "",
            'userType': '0',
            "phone": "",
            "wechat": "",
            "avatar": "",
            "password": null,
        },
        is_login: false,
        UserItemsList: [],
    },
    getters: {
        getUser: state => {
            return state.userInfo;
        }
    },
    mutations: {
        signOut(state) {
            state.userInfo = {
                "email": "",
                "username": "",
                'userType': '0',
                "qq": "",
                "phone": "",
                "wechat": "",
                "avatar": "",
                "password": null,
            };
            state.is_login = false;
        },
        setUserItemList(state, list) {
            console.log("state.UserItemsList:" + state.UserItemsList);
            console.log("state:" + state);
            state.UserItemsList.push(list);
        },
        RegisterInfoLogin(state, email) {
            state.userInfo.email = email;
            state.userInfo.username = "商城萌新";
            state.is_login = true;
        },
        LoginInfoLogin(state, info) { //全局vue还有登录及重置密码都会调用这个接口去将后台返回到的用户的信息写入前端
            state.userInfo = info;
            state.is_login = true;
        },
        changeUserInfo(state, info) {
            state.userInfo.username = info.username;
            state.userInfo.qq = info.qq;
            state.userInfo.wechat = info.wechat;
            state.userInfo.phone = info.phone;
        },
        changeAvatar(state, url) {
            state.userInfo.avatar = url;
        }
    },
    actions: {
        // 登录    
        Login({
            commit /* 传入commit函数下面调用了commit */
        }, userInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用      
            return new Promise((resolve, reject) => { //封装一个 Promise 
                login(userInfo.username, userInfo.password, userInfo.userType).then(response => { //使用 login 接口进行网络请求          
                    commit('') //提交一个 mutation，通知状态改变          
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注册调用后端发送验证码
        Register({
            commit /* 传入commit函数下面调用了commit */
        }, RegisterInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用      
            return new Promise((resolve, reject) => { //封装一个 Promise        
                Register(RegisterInfo.email).then(response => { //使用 login 接口进行网络请求
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //完成注册
        RegisterCheck({
            commit /* 传入commit函数下面调用了commit */
        }, RegisterInfo) {
            return new Promise((resolve, reject) => {
                RegisterCheck(RegisterInfo.email, RegisterInfo.password, RegisterInfo.code).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //重设个人信息
        changeInfo({
            commit /* 传入commit函数下面调用了commit */
        }, UserInfo) {
            return new Promise((resolve, reject) => {
                changeInfo(UserInfo).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //发送重置密码时的验证码
        setCheakCode({
            commit
        }, numberValidateForm) {
            return new Promise((resolve, reject) => {
                SetCheakCode(numberValidateForm.email, numberValidateForm.userType).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //重设密码并登录
        resetPassword({
            commit
        }, form) {
            return new Promise((resolve, reject) => {
                ResetPassword(form).then(response => {
                    commit('') //提交一个 mutation，通知状态改变             
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default user