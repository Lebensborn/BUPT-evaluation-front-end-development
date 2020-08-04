import Vue from 'vue' //引入 Vue
import VueRouter from 'vue-router' //引入 Vue 路由 

Vue.use(VueRouter); //安装插件
 
export const constantRouterMap = [
    //配置默认的路径，默认显示登录页
    { path: '/', component: () => import('@/views/login')},
    //配置忘记密码页面步骤（1）
    { path: '/forgetPassword-step-1', component: () => import('@/views/forgetPassword-step-1')},
    //配置忘记密码页面步骤（2）
    { path: '/forgetPassword-step-2', component: () => import('@/views/forgetPassword-step-2')},
    //配置忘记密码页面步骤（2）
    { path: '/forgetPassword-step-3', component: () => import('@/views/forgetPassword-step-3')},
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
    { path: '/studentDevelopmentEvaluation', component: () => import('@/views/studentDevelopmentEvaluation')},
    //配置学生基本素质评价
    { path: '/studentBasicQualityEvaluation', component: () => import('@/views/studentBasicQualityEvaluation')},
]
 
export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap //指定路由列表
})
