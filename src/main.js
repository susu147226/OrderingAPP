import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/scss/comm.scss";
//导入了vant的样式
import "vant/lib/index.css";
//导入index.css相当于导入tailwindcss
import "./assets/css/index.css";

//导入vant的懒加载 
import { Lazyload } from 'vant';


//导入animate.css的样式
import "animate.css";


import PageView from "./components/PageView.vue";
import TitleBar from "./components/TitleBar.vue";
import MyLoading from "./components/MyLoading.vue";

// createApp(App).use(router).mount('#app')

const app = createApp(App);
//注册全局组件

app.component("page-view", PageView);
app.component("title-bar", TitleBar);
app.component("my-loading", MyLoading);

//注入全局数据
app.provide("baseURL", "http://www.softeem.xin:9544");

//配置懒加载 
app.use(Lazyload, {
    lazyComponent: true,
    loading: require("./assets/img/loading.gif"),
    error: require("./assets/img/error.jpg")
});


app.use(router);
app.mount("#app");
