import {
    ReleaseItem,
    SaveCement,
    SubMit
} from "@/api/release"
const release = {
    state: {
        release_info: {
            "id": -1,
            "title": "",
            "price": null,
            "itemType": null,
            "introduction": "",
            "bargain": true,
            "location": "",
        },
        release_img: []
    },
    mutations: {
        cleanRelease(state) {
            state.release_info = [];
            state.release_img = [];
        },
    },
    actions: {
        releaseItem({ commit }, obj) { // 传入commit函数下面调用了commit. 之前在这打了个括号忘了删，导致参数死都没传进去，切记
            //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用  
            return new Promise((resolve, reject) => { //封装一个 Promise        
                ReleaseItem(obj).then(response => { //使用 login 接口进行网络请求          
                    commit('') //提交一个 mutation，通知状态改变          
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        saveCement({commit}, data){
            return new Promise((resolve, reject) => { //封装一个 Promise      
                SaveCement(data).then(response => { //使用 login 接口进行网络请求          
                    commit('') //提交一个 mutation，通知状态改变          
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
        Submit({commit}, data){
            return new Promise((resolve, reject) => { //封装一个 Promise      
                SubMit(data).then(response => { //使用 login 接口进行网络请求          
                    commit('') //提交一个 mutation，通知状态改变          
                    resolve(response) //将结果封装进 Promise        
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default release
