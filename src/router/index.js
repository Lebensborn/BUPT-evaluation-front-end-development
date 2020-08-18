import Vue from 'vue' //引入 Vue
import VueRouter from 'vue-router' //引入 Vue 路由 

Vue.use(VueRouter); //安装插件
 
export const constantRouterMap = [
    //配置默认的路径，默认显示登录页
    { path: '/', component: () => import('@/views/login')},
    //配置忘记密码页面步骤（1）
    { path: '/forgetPassword-step-one', component: () => import('@/views/forgetPassword/forgetPassword-step-one')},
    //配置忘记密码页面步骤（2）
    { path: '/forgetPassword-step-two', component: () => import('@/views/forgetPassword/forgetPassword-step-two')},
    //配置忘记密码页面步骤（2）
    { path: '/forgetPassword-step-three', component: () => import('@/views/forgetPassword/forgetPassword-step-three')},

    //-------------------------------------学生界面-----------------------------------------------//
    //配置主页
    { path: '/student', component: () => import('@/views/student/student')},
    //配置公告
    { path: '/studentBoard', component: () => import('@/views/student/studentBoard')},
    //配置公告申请
    { path: '/studentBoardApply', component: () => import('@/views/student/studentBoardApply')},
    //配置信息
    { path: '/studentPersonalInformation', component: () => import('@/views/student/studentPersonalInformation')},
    //配置自评互评
    { path: '/studentCement', component: () => import('@/views/student/studentCement')},
    //配置指定给分
    { path: '/assignCement', component: () => import('@/views/student/assignCement')},
    //配置指定给分
    { path: '/classCommitteeCement', component: () => import('@/views/student/classCommitteeCement')},
    

    //-------------------------------------管理员界面-----------------------------------------------//
    //配置主页
    { path: '/admin', component: () => import('@/views/admin/admin')},
    //配置信息
    { path: '/adminPersonalInformation', component: () => import('@/views/admin/adminPersonalInformation')},
    //配置公告申请
    { path: '/adminBoardApply', component: () => import('@/views/admin/adminBoardApply')},
    //配置公告
    { path: '/adminBoard', component: () => import('@/views/admin/adminBoard')},
    //配置管理员评价
    // { path: '/adminCement', component: () => import('@/views/admin/adminCement')},
    //配置管理员得分
    { path: '/adminScoringStatus', component: () => import('@/views/admin/adminScoringStatus')},
    //配置管理员系统日志
    { path: '/adminSystemLog', component: () => import('@/views/admin/adminSystemLog')},
    //配置管理员用户账号管理
    { path: '/adminUserAccount', component: () => import('@/views/admin/adminUserAccount')},
    //配置活动类型
    { path: '/adminActivityType', component: () => import('@/views/admin/adminActivityType')},
    //配置辅导员转换
    { path: '/adminTransferDelegateAuthority', component: () => import('@/views/admin/adminTransferDelegateAuthority')},

    //-------------------------------------辅导员界面-----------------------------------------------//
    //配置主页
    { path: '/instructor', component: () => import('@/views/instructor/instructor')},
    //配置信息
    { path: '/instructorPersonalInformation', component: () => import('@/views/instructor/instructorPersonalInformation')},
    //配置公告申请
    { path: '/instructorBoardApply', component: () => import('@/views/instructor/instructorBoardApply')},
    //配置公告
    { path: '/instructorBoard', component: () => import('@/views/instructor/instructorBoard')},

    // { path: '/instructorCement', component: () => import('@/views/instructor/instructorCement')},
    //配置辅导员得分
    { path: '/instructorAssignCement', component: () => import('@/views/instructor/instructorAssignCement')},
    //配置辅导员评价
    { path: '/instructorBoardExamination', component: () => import('@/views/instructor/instructorBoardExamination')},
    //配置辅导员班委打分
    { path: '/instructorClassCommitteeScoring', component: () => import('@/views/instructor/instructorClassCommitteeScoring')},
    //配置辅导员评估检查
    { path: '/instructorEvaluationExamination', component: () => import('@/views/instructor/instructorEvaluationExamination')},
    //配置辅导员转换
    { path: '/instructorTransferDelegateAuthority', component: () => import('@/views/instructor/instructorTransferDelegateAuthority')},
]
 
export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap //指定路由列表
})

