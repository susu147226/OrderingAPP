import axios from "axios";
import store from "@/store";


const axiosInstance = axios.create({
    baseURL: "http://www.softeem.xin:9544",
    timeout: 5000
});

//添加请求拦截器
//request
axiosInstance.interceptors.request.use(config=>{
    console.log("你每次发请求都会经过这个拦截器");
    config.headers["softeem_ele_client_token"] = store.getters.token;
    return config;
});


//添加响应拦截器
//response
axiosInstance.interceptors.response.use(resp => {
    console.log("我是响应拦截器，你每次请求的响应我都会拦截下来");
    if (resp.data.status === "success") {
        return Promise.resolve(resp.data.data);
    }
    else {
        //请求虽然回来了，但是是失败了
        console.log(`服务请求成功了，但是status没有成功`);
        console.log(resp.data);
        return Promise.reject(resp.data);
    }
}, error => {
    //这一种情况就是服务器错误 ，后端错误，如500，403,404等
    console.log(error);
    return Promise.reject(error);
});


export default axiosInstance;