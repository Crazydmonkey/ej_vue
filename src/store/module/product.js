import axios from '@/http/index'
export default {
    namespaced:true,
    state:{
        name:"product",
        list:[],
        loading:true,
        product:{}
    },
    getters:{

    },
    mutations:{
        resetList(state,data){
            state.list=data;
        },
        resetLoading(state,data){
            state.loading=data;
        },
        resetProduct(state,data){
            state.product=data;
        }
    },
    actions:{
        findAll(context,params){
            context.commit('resetLoading',true);
            axios.get('/product/findAll').then((res)=>{
                context.commit('resetList',res.data);
            }).finally(()=>{
                context.commit('resetLoading',false)
            })
        },
        setProduct(context,params){
            context.commit('resetProduct',params)
        },
        saveOrUpdate(context,params){
            axios.post('/product/saveOrUpdate',params).then((res)=>{
                context.dispatch('findAll');
            })  
        },
        deleteProductById(context,id){
            axios.get('/product/deleteById',{params:{id}}).then((res)=>{
                context.dispatch('findAll');
            })  
        },
        batchDeleteProduct(context,ids){
            axios.post('/product/batchDelete',{ids:ids}).then((res)=>{
                context.dispatch('findAll');
            })
        }
    }
};