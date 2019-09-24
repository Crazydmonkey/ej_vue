import Vue from 'vue';
import Vuex from 'vuex';


import category from './module/category'
import product from './module/product'
import customer from './module/customer'
import address from './module/address'
import comment from './module/comment'
import waiter from './module/waiter'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        category:category,
        product:product,
        customer:customer,
        address,
        comment,
        waiter
    }
})