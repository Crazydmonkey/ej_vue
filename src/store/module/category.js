import axios from '@/http/index'
export default {
    namespaced:true,
    state:{
        name:"category",
        list:[],
        loading:true,
        category:{
        }
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
        resetCategory(state,data){
            state.category=data;
        }
    },
    actions:{
        findAll(context,params){
            axios.get('/category/findAll').then((res)=>{
                context.commit('resetList',res.data)
            }).finally(()=>{
                context.commit('resetLoading',false)
            })
        },
        saveOrUpdate(context,params){
            axios.post('/category/saveOrUpdate',params).then((res)=>{
                context.dispatch('findAll')
            })
        },
        deleteCategoryById(context,id){
            axios.get('/category/deleteById',{params:{id}}).then((res)=>{
                context.dispatch('findAll')
            })
        },
        setCategory(context,params){
            context.commit('resetCategory',params);
        },
        batchDelete(context,ids){
            axios.post('/category/batchDelete',{ids:ids}).then((res)=>{
                context.dispatch('findAll')
            })
        }
    }
};