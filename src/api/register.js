import request from "@/utils/request"

export function Register(email){
    return request({
        url:'admin/register',
        method:'post',
        data:{
            email
        }
    })
}
export function RegisterCheck(email,password,code){
    return request({
        url:'admin/register',
        method:'post',
        data:{
            email,
            password,
            code
        }
    })
}
