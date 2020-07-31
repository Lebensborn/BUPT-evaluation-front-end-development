import Vue from 'vue' //引入 Vue
import Vuex from 'vuex' //引入 Vuex
import user from './modules/user' //引入 user module
import release from './modules/release' //引入 release module
import mainpage from './modules/mainpage' //引入 mainpage module 
import itemDetail from './modules/itemDetail' //引入 itemDetail module 
Vue.use(Vuex)
/* 
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，
store 对象就有可能变得相当臃肿。
为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。
每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割： */
/* const moduleA = {
    state: {
        ...
    },
    mutations: {
        ...
    },
    actions: {
        ...
    },
    getters: {
        ...
    }
}

const moduleB = {
    state: {
        ...
    },
    mutations: {
        ...
    },
    actions: {
        ...
    }
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
}) 
*/
const store = new Vuex.Store({
    modules: {
        user: user, //使用 user.js 中的 action  
        mainpage: mainpage,
        release: release,
        itemDetail: itemDetail,
    }
})
export default store