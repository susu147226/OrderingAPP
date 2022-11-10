<template>
  <page-view class="flex flex-col">
    <title-bar>我的</title-bar>
    <div class="flex-1 overflow-auto">
      <div class=" flex flex-col justify-center items-center h-[160px] bg-gradient-to-b from-primaryColor to-green-300">
        <img  v-if="loginUserInfo" v-lazy="baseURL+loginUserInfo.user_photo" class="w-[80px] h-[80px] rounded-full" alt="">
        <img v-else src="../assets/img/user.jpg" class="w-[80px] h-[80px] rounded-full" alt="">
        <p @click="$router.push({name:'Login'})" class="text-[14px] text-gray-700 mt-[10px]">
          <span v-if="loginUserInfo">欢迎登录：{{loginUserInfo.nickName}}</span>
          <span v-else>点击去登录</span>
        </p>
      </div>
      <CellGroup title="操作信息" v-if="loginUserInfo">
        <Cell icon="shopping-cart-o" title="购物车列表" :is-link="true" :to="{name:'ShopCartList'}"></Cell>
        <Cell icon="shop-o" title="我的订单" :is-link="true"></Cell>
        <Cell icon="location-o" title="收货地址" :is-link="true"></Cell>
        <Cell icon="guide-o" title="退出登录" @click="logOut" :is-link="true"></Cell>
      </CellGroup>
      <Empty v-else description="未登录,无操作信息"></Empty>
    </div>
  </page-view>
</template>
<script>
import {Cell,CellGroup,Empty,Dialog} from "vant";
import {mapGetters,mapActions} from "vuex";
export default {
  name: "My",
  inject:["baseURL"],
  computed:{
    ...mapGetters(["loginUserInfo"]),
  },  
  methods:{
    ...mapActions(["setLogOut"]),
    logOut(){
      Dialog.confirm({
        title:"请确定",
        message:"你确定要退出登录吗"
      }).then(()=>{
        this.setLogOut();
      }).catch(()=>{})
    }
  },
  components:{
    Cell,
    CellGroup,
    Empty
  }
};
</script>
<style scoped>
</style>