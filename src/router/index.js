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
    //配置忘记密码页面步骤（3）
    { path: '/forgetPassword-step-3', component: () => import('@/views/forgetPassword-step-3')},
    //配置学生主页
    { path: '/student', component: () => import('@/views/student')},
    //配置学生个人资料
    { path: '/studentPersonalInformation', component: () => import('@/views/studentPersonalInformation')},
    //配置学生自评与互评
    { path: '/studentCement', component: () => import('@/views/studentCement')},
    //配置学生指定给分
    { path: '/studentAllocateScores', component: () => import('@/views/studentAllocateScores')},
    //配置学生班委评分
    { path: '/studentClassCommitteeAllocateScores', component: () => import('@/views/studentClassCommitteeAllocateScores')},
    //配置学生申请公告公示
    { path: '/studentBoardApply', component: () => import('@/views/studentBoardApply')},
    //配置学生测评信息审核
    { path: '/studentEvaluationExamination', component: () => import('@/views/studentEvaluationExamination')},
    //配置学生公告公示
    { path: '/studentBoard', component: () => import('@/views/studentBoard')},

    //配置辅导员主页
    { path: '/instructor', component: () => import('@/views/instructor')},
    //配置辅导员个人资料
    { path: '/instructorPersonalInformation', component: () => import('@/views/instructorPersonalInformation')},
    //配置辅导员测评信息审核
    { path: '/instructorEvaluationExamination', component: () => import('@/views/instructorEvaluationExamination')},
    //配置辅导员转移下放权限
    { path: '/instructorTransferDelegateAuthority', component: () => import('@/views/instructorTransferDelegateAuthority')}, 
    //配置辅导员公告申请审核
    { path: '/instructorBoardApplyExamination', component: () => import('@/views/instructorBoardApplyExamination')}, 
    //配置辅导员发布公告公示
    { path: '/instructorBoardApply', component: () => import('@/views/instructorBoardApply')}, 
    //配置辅导员指定给分
    { path: '/instructorAllocateScores', component: () => import('@/views/instructorAllocateScores')}, 
    //配置辅导员班委评分
    { path: '/instructorClassCommitteeAllocateScores', component: () => import('@/views/instructorClassCommitteeAllocateScores')},    
    //配置辅导员公告公示
    { path: '/instructorBoard', component: () => import('@/views/instructorBoard')},
]
 
export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap //指定路由列表
})
