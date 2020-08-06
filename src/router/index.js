import Vue from 'vue' //引入 Vue
import VueRouter from 'vue-router' //引入 Vue 路由 

Vue.use(VueRouter); //安装插件
 
export const constantRouterMap = [
    //配置默认的路径，默认显示登录页
    { path: '/', component: () => import('@/views/login')},
    //配置忘记密码页面步骤（1）
    { path: '/forgetPassword-step-one', component: () => import('@/views/forgetPassword-step-one')},
    //配置忘记密码页面步骤（2）
    { path: '/forgetPassword-step-two', component: () => import('@/views/forgetPassword-step-two')},
    //配置忘记密码页面步骤（2）
    { path: '/forgetPassword-step-three', component: () => import('@/views/forgetPassword-step-three')},
    //配置主页
    { path: '/student', component: () => import('@/views/student')},
    //配置学生公告
    { path: '/studentBoard', component: () => import('@/views/studentBoard')},
    //配置学生公告申请
    { path: '/studentBoardApply', component: () => import('@/views/studentBoardApply')},
    //配置学生信息
    { path: '/studentPersonalInformation', component: () => import('@/views/studentPersonalInformation')},
    //配置学生公告申请
    { path: '/studentCement', component: () => import('@/views/studentCement')},
    //配置学生发展评价
    
]
 
export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap //指定路由列表
})
