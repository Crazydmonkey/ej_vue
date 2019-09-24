import axios from 'axios';
import qs from 'qs'
// import qs from 'qs';
//axios全局默认配置
axios.defaults.baseURL='http://134.175.100.63:6677'
axios.defaults.headers["Content-type"]='application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.response=[function(data){
    //响应信息的转化，data是后端传给
    console.log(data);
    return data;
}]//拦截器，后台没有创建response
//拦截器的配置,请求之前
//axios.interceptors.request=[]
axios.interceptors.request.use((config)=>{
    if(config.method==='post'){
        config.data=qs.stringify(config.data,{ arrayFormat: 'repeat' });
    }
    return config;
})
axios.interceptors.response.use((response)=>{
    console.log(response);
    let {data}=response;
    response.status=data.status;
    response.statusText=data.message;
    response.data=data.data;
    return response;
},(error)=>{
    message.error('服务器异常');
    console.log(error);
    return Promise.reject(error);//then不会执行
})
export default axios;