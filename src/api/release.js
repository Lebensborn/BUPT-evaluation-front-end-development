import request from "@/utils/request"

export function ReleaseItem(form) {
    var id=form.id;
    var bargain;
    if (form.bargain == true)
        bargain = 1;
    else
        bargain = 0;
    var introduction;
    if (form.introduction != null)
        introduction = form.introduction.trim();
    var itemType = form.itemType;
    var location;
    if (form.location != null)
        location = form.location.trim();
    var price = Number(form.price);
    var title
    if (form.title != null)
        title = form.title.trim();
    var pic = [];
    return request({
        url: 'admin/releaseItem',
        method: 'post',
        data: {
            id,
            bargain,
            introduction,
            itemType,
            location,
            price,
            title,
            pic
        }
    })
}