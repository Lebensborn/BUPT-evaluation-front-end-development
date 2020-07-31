import request from '@/utils/request' //引入封装好的 axios 请求
 
export function login(username, password, usertype) { //登录接口
  if(usertype == 0)
  {
    return request({ //使用封装好的 axios 进行网络请求
        url: '/session?type=student',
        method: 'post',
        data: { //提交的数据
          username,
          password
        }
      })
  }
  else if(usertype == 1)
  {
    return request({ //使用封装好的 axios 进行网络请求
        url: '/session?type=teacher',
        method: 'post',
        data: { //提交的数据
          username,
          password
        }
      })
  }
  else
  {
    return request({ //使用封装好的 axios 进行网络请求
        url: '/session?type=master',
        method: 'post',
        data: { //提交的数据
          username,
          password
        }
      })
  }
}

export function SetCheakCode(email, usertype) {
    email = email.trim();
    if(usertype == 0)
    {
      return request({
        url: '/code/password?type=student',
        method: 'post',
        data: {
            email
        }
      })
    }
    else
    {
      return request({
        url: '/code/password?type=teacher',
        method: 'post',
        data: {
            email
        }
    })
    }
}

export function ResetPassword(form) {
    var email = form.email.trim();
    var password = form.password.trim();
    if(form.userType == 0)
    {
      return request({
        url: '/password?type=student',
        method: 'post',
        data: {
            email,
            password,
        }
      })
    }
    else if(form.userType == 1)
    {
      return request({
        url: '/password?type=teacher',
        method: 'post',
        data: {
            email,
            password,
        }
      })
    }
    else
    {
      return request({
        url: '/password?type=master',
        method: 'post',
        data: {
            email,
            password,
        }
      })
    }
}

