import request from '@/utils/request' //引入封装好的 axios 请求
//登陆接口
export function login(userId, password, userType) { //登录接口
  userId = userId.toString();
  password = password.toString();

  userId = userId.trim();
  password = password.trim();
  userType = userType.trim();
  return request({ //使用封装好的 axios 进行网络请求
    url: '/user/session',
    method: 'post',
    data: { //提交的数据
      userId,
      password,
      userType
    }
  })
}
//用户界面邮箱发验证码
export function SetCheakCode1(userEmail) {
    var email = userEmail.trim();
    return request({
      url: '/code/email',
      method: 'post',
      data: {
        email, 
      }
    })
}
//忘记密码邮箱发验证码
export function SetCheakCode2(userId) {
  return request({
    url: '/code/password',
    method: 'post',
    data: {
      userId, 
    }
  })
}
//用户界面重设密码
export function ResetPassword(form) {
  var password = form.pass.trim();
  return request({
    url: '/user/password/user',
    method: 'put',
    data: {
      password,
    }
  })
}
//忘记密码重置密码
export function ForgetPassword(form) {
  var userId = form.userId;
  var code = form.code;
  var password = form.password;
  return request({
    url: '/user/password/forget',
    method: 'put',
    data: {
      userId,
      code,
      password,
    }
  })
}

