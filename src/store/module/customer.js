import axios from '@/http/index'
export default {
    namespaced:true,
    state:{
        name:"customer",
        list:[]
    },
    getters:{

    },
    mutations:{
        resetList(state,data){
           
            state.list=data;
        }
    },
    actions:{
        findAll(context,params){
            axios.get('/customer/findAll').then(res=>{
                context.commit('resetList',res.data)
            }).catch(err=>{
                reject(err)
            })
        },
        saveOrUpdate(context,params){
            console.log(params)
            axios.post('/customer/saveOrUpdate',params).then((result)=>{
                console.log(result);
                context.dispatch('findAll');
            })
        },
        deleteCustomer(context,id){
            axios.get('/customer/deleteById',{params:{id}}).then((result)=>{
                console.log(result);
                context.dispatch('findAll');
            })
        },
        batchDeleteCustomer(context,ids){
            console.log(ids)
            axios.post('/customer/batchDelete',{ids:ids}).then((result)=>{
                console.log(result);
                context.dispatch('findAll');
            })
        }
    }
};