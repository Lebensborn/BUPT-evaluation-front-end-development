import request from "@/utils/request"

export function changeInfo(form) {
    var username;
    if (form.username != null)
        username = form.username.trim();
    var qq;
    if (form.qq != null)
        qq = form.qq.trim();
    var phone;
    if (form.phone != null)
        phone = form.phone.trim();
    var wechat;
    if (form.wechat != null)
        wechat = form.wechat.trim();
    return request({
        url: 'admin/changeUserInfo',
        method: 'post',
        data: {
            username,
            qq,
            phone,
            wechat
        }
    })
}