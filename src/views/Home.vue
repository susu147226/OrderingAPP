<template>
  <page-view class="home-page">
    <div class="content-box">
      <router-view></router-view>
    </div>
    <ul class="tab-bar">
      <router-link :to="{name:'ChooseFood'}" custom #default="{navigate,isActive}">
        <li @click="navigate" :class="{selected:isActive}">
          <span class="iconfont icon-dropbox"></span>
          点餐
        </li>
      </router-link>
      <router-link :to="{name:'Order'}" custom #default="{navigate,isActive}">
        <li @click="navigate" :class="{selected:isActive}">
          <span class="iconfont icon-layout-fill"></span>  
          订单
        </li>
      </router-link>
      <router-link :to="{name:'Category'}" custom #default="{navigate,isActive}">
        <li @click="navigate" :class="{selected:isActive}">
          <span class="iconfont icon-tag-fill"></span>
          分类
        </li>
      </router-link>
      <router-link :to="{name:'My'}" custom #default="{navigate,isActive}">
        <li @click="navigate" :class="{selected:isActive}">
          <span class="iconfont icon-user"></span>
          我的
        </li>
      </router-link>

    </ul>
  </page-view>
</template>
<script>
export default {
  name: "Home",
};
</script>
<style scoped lang="scss">
/* 如果style标签里面加了scoped代表当前的样式是有作用域
说明当前的style里面的样式只作用于当前的vue文件
*/

@import "../assets/scss/comm.scss";
//如果没有url就不会通过url-loader去处理

.home-page {
  display: flex;
  flex-direction: column;
}

.content-box {
  flex: 1;
  overflow: auto;
}
.tab-bar {
  height: 55px;
  border-top: 1px solid lightgray;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-around;
  > li {
    width: 55px;
    height: 100%;
    box-sizing: border-box;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.selected{
      color: $primaryColor;
      font-weight: bold;
    }
    .iconfont{
      font-size: 22px;
    }
  }
}
</style>