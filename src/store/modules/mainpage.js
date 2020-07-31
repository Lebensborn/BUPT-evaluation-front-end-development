/* // 当只有一个参数时，圆括号是可选的：
(singleParam) => {
    statements
}
singleParam => {
    statements
}
// 没有参数的函数应该写成一对圆括号。
() => {
    statements
} */
import request from "@/utils/request"; //打了大括号后显示找不到request函数

const mainpage = {
    state: {
        ItemsList: [],
        ItemType: [{
            "name": "最新发布",
            "imgPath": "index.png",
            "id": 1
        }, {
            "name": "闲置数码",
            "imgPath": "digital.png",
            "id": 2
        }, {
            "name": "校园代步",
            "imgPath": "ride.png",
            "id": 3
        }, {
            "name": "电器日用",
            "imgPath": "commodity.png",
            "id": 4
        }, {
            "name": "图书教材",
            "imgPath": "book.png",
            "id": 5
        }, {
            "name": "美妆衣物",
            "imgPath": "makeup.png",
            "id": 6
        }, {
            "name": "运动棋牌",
            "imgPath": "sport.png",
            "id": 7
        }, {
            "name": "票券小物",
            "imgPath": "smallthing.png",
            "id": 8
        }]
    },
    /* getters: {
        saleProducts: (state) => {
            let saleProducts = state.products.map(product => {
                return {
                    name: product.name,
                    price: product.price / 2
                }
            })
            return saleProducts;
        }
    },*/
    mutations: {
        setItemList(state, list) {
            state.ItemsList = list;
        }
    },
    actions: {
        // 根据条件获取商品列表  
        GetItemList({
            commit
        }, obj) { //定义 GetItemList 方法，用来获取项目列表obj里面的id和用户名主键可同时对主页和我发布的项目做筛选    
            return new Promise((resolve, reject) => { //封装一个 Promise        
                request({
                    url: "admin/getItemList?id=" + obj.id + "&email=" + obj.email,
                    method: "get"
                }).then(response => { //获取到返回的列表    
                    if (response.status == 200) //若正常返回
                    {
                        if (obj.email == "") //邮箱为空是主页请求    
                            commit('setItemList', response.data)
                        else
                            commit("setUserItemList", response.data);
                        resolve()
                    } else
                        reject()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetItemListBySearch({
            commit
        }, search) { //定义 GetItemList 方法，用来获取项目列表obj里面的id和用户名主键可同时对主页和我发布的项目做筛选    
            return new Promise((resolve, reject) => { //封装一个 Promise        
                request({
                    url: "admin/getItemListBySearch?search=" + search,
                    method: "get"
                }).then(response => { //获取到返回的列表    
                    if (response.status == 200) //若正常返回
                    {
                        commit('setItemList', response.data)
                        resolve()
                    } else
                        reject()
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default mainpage