import request from "@/utils/request"

export function ReleaseItem(form) {
    var type;
    if (form.type == '通知')
        type = 1;
    else
        type = 2;

    var title = form.title;
    var content = form.content;
    var startPubTime = form.value1[0];
    var endPubTime = form.value1[1];
    var file = form.fileList;
    var range;
    if(form.range == "计算机学院19级"){
        range = ['2019211301', '2019211302', '2019211303', '2019211304', '2019211305', '2019211306', '2019211307', '2019211308', '2019211309', '2019211310', '2019211311', '2019211312', '2019211313', '2019211314', '2019211315', '2019211316', '2019211317', '2019211318', '2019211319']
    }
    else if(form.range == '一大班'){
        range = ["2019211301", "2019211302", "2019211303", "2019211304", "2019211305", "2019211306"]
    }
    else if(form.range == '二大班'){
        range = ["2019211307", "2019211308", "2019211309", "2019211310", "2019211311", "2019211312"]
    }
    else if(form.range == '三大班'){
        range = ["2019211313", "2019211314", "2019211315", "2019211316", "2019211317", "2019211318"]
    }
    else{
        range = [form.range];
    }

    return request({
        url: '/notification',
        method: 'post',
        data: {
            title,
            type,
            content,
            startPubTime,
            endPubTime,
            file,
            range
        }
    })
}

export function SaveCement(tableData) {
    return request({
        url: '/basicQuality/selfJudgment/save',
        method: 'post',
        data: 
            tableData
        
    })
}

export function SubMit(tableData) {
    return request({
        url: '/basicQuality/selfJudgment/confirm',
        method: 'post',
        data: 
            tableData
        
    })
}