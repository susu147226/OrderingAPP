import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
// vue-cli的脚手架下面，`@`在路径里面代表的是src目录
import Home from "@/views/Home.vue";
import FoodDetail from "@/views/FoodDetail.vue";
import Login from "../views/Login.vue";
import ChooseFood from "../views/ChooseFood.vue";
import Order from "../views/Order.vue";
import Category from "../views/Category.vue";
import My from "../views/My.vue";
import Register from "../views/Register.vue";
import ShopCartList from "../views/ShopCartList.vue";
import AddressInfoList from "../views/AddressInfoList.vue";
import AddAddressInfo from "../views/AddAddressInfo.vue";
import EditAddressInfo from "../views/EditAddressInfo.vue";



const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        redirect: {
            name: "ChooseFood"
        }
    },
    {
        path: "/Home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "ChooseFood",
                name: "ChooseFood",
                component: ChooseFood,

            }, {
                path: "Order",
                name: "Order",
                component: Order
            }, {
                path: "Category",
                name: "Category",
                component: Category
            }, {
                path: "My",
                name: "My",
                component: My
            }
        ]
    }, {
        path: "/FoodDetail/:id",
        name: "FoodDetail",
        component: FoodDetail
    }
        , {
        path: "/Login",
        name: "Login",
        component: Login
    }, {
        path: "/Register",
        name: "Register",
        component: Register
    },
    {
        path: "/ShopCartList",
        name: "ShopCartList",
        component: ShopCartList,
        //我们通过meta标记附加了网页的基本信息
        //同时要注意requireAuth 我们假设就是需要登录以后才能访问
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/AddressInfoList",
        name: "AddressInfoList",
        component: AddressInfoList,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/AddAddressInfo",
        name: "AddAddressInfo",
        component: AddAddressInfo,
        meta: {
            requireAuth: true
        }
    }, {
        path: "/EditAddressInfo/:id",
        name: "EditAddressInfo",
        component: EditAddressInfo,
        meta: {
            requireAuth: true
        }
    }
    ]
});


/**
 * 导航守卫
 * 1. 前置导航守卫
 * 2. 后置导航守卫
 */
// 如果要在跳转某一个页面之前做拦截，可以命令与征服和前置导航守卫

router.beforeEach((to, from, next) => {
    // to代表你要去哪进而
    // from代表你从哪里来
    // next()决定是否放行
    // console.log("我是beforeEach");
    if (to.meta.requireAuth === true) {
        //说明你要去的这个页面是要登录的
        if (store.getters.loginUserInfo) {
            //说明当前已经登录了
            next();
        }
        else {
            //说明没有登录
            next({
                name: "Login"
            })
        }
    }
    else {
        //说明要去的这个页面不用登录
        next();
    }
});


// router.afterEach((to, from) => {
//   console.log("我是afterEach");
// });


export default router;
