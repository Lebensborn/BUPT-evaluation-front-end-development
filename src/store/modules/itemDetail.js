import request from "@/utils/request"; //打了大括号后显示找不到request函数

const itemDetail = {
    state: {
        itemDetailInfo: {},
        seller: {
            "email": "",
        },
    },
    mutations: {
        setItemDetail(state, list) {
            state.itemDetailInfo = list.itemDetailInfo;
            state.seller = list.seller;
        }
    },
    actions: {
        // 根据条件获取商品的详细信息及卖家信息 
        GetItemDetail({
            commit
        }, id) { //定义 GetItemDetail 方法，用来获取项目的详细信息
            return new Promise((resolve, reject) => { //封装一个 Promise        
                request({
                    url: "admin/getItemDetail?id=" + id,
                    method: "get"
                }).then(response => { //获取到返回的列表    
                    if (response.status == 200) //若正常返回
                    {
                        if (response.data != "") {
                            commit("setItemDetail", response.data);
                            resolve(true);
                        }
                        resolve(false);
                    } else
                        reject()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        DeleteItem({
            commit
        }, id) { //定义 GetItemDetail 方法，用来获取项目的详细信息
            return new Promise((resolve, reject) => { //封装一个 Promise        
                request({
                    url: "admin/deleteItem?id=" + id,
                    method: "get"
                }).then(response => { //获取到返回的列表  
                    commit("");
                    if (response.status == 200) //若正常返回
                    { //注意promise的resolve只能接受一个参数
                        let obj = {}
                        if (response.data != "ok") {
                            obj = {
                                state: "error",
                                msg: response.data
                            };
                        } else {
                            obj = {
                                state: "success",
                                msg: "成功删除商品"
                            };
                        }
                        resolve(obj);
                    } else
                        reject()
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default itemDetail