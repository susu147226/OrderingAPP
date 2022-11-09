<template>
  <div class="title-bar">
    <div class="left-back" v-if="showBack" @click="$router.back()">
      <span class="iconfont icon-fanhui"></span>
      返回
    </div>
    <slot></slot>
    <div class="right-menu">
      <slot name="menu"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TitleBar",
  props: {
    showBack: {
      type: Boolean,
      default: false,
    },
  }
};
</script>
<style scoped lang="scss">
@import "../assets/scss/comm.scss";
.title-bar {
  height: 45px;
  background-color: $primaryColor;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  .left-back {
    position: absolute;
    left: 10px;
    font-weight: bold;
  }
  .right-menu {
    position: absolute;
    right: 10px;
    font-weight: bold;
  }
}
</style>