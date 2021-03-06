import axios from '@/http/index'

export default {
    namespaced:true,
    state:{
        name:'waiter',
        list:[],
        loading:true,
        waiter:{}
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
        resetWaiter(state,data){
            state.waiter=data;
        }
    },
    actions:{
        findAll(context,params){
            context.commit('resetLoading',true);
            axios.get('/waiter/findAll').then((res)=>{
                context.commit('resetList',res.data);
            }).finally(()=>{
                context.commit('resetLoading',false)
            })
        },
        setWaiter(context,params){
            context.commit('resetWaiter',params)
        },
        saveOrUpdate(context,params){
            axios.post('/waiter/saveOrUpdate',params).then((res)=>{
                context.dispatch('findAll');
            })  
        },
        deleteWaiterById(context,id){
            axios.get('/waiter/deleteById',{params:{id}}).then((res)=>{
                context.dispatch('findAll');
            })  
        },
        batchDeleteWaiter(context,ids){
            axios.post('/waiter/batchDelete',{ids:ids}).then((res)=>{
                context.dispatch('findAll');
            })
        }
    }
}