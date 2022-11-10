import { createRouter, createWebHashHistory } from 'vue-router';
// vue-cli的脚手架下面，`@`在路径里面代表的是src目录
import Home from "@/views/Home.vue";
import FoodDetail from "@/views/FoodDetail.vue";
import Login from "../views/Login.vue";
import ChooseFood from "../views/ChooseFood.vue";
import Order from "../views/Order.vue";
import Category from "../views/Category.vue";
import My from "../views/My.vue";
import Register from "../views/Register.vue";


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
        component: ChooseFood
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
  } ,{
    path: "/Register",
    name: "Register",
    component: Register
  }
  ]
})

export default router
