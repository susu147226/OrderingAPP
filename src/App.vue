<template>
    <router-view #default="{ Component }">
        <keep-alive :include="keepAliveList">
            <component :is="Component"></component>
        </keep-alive>
    </router-view>
</template>

<script>
import keepAliveList from "@/router/keepAliveList";
export default {
    name: "App",
    data() {
        return {
            keepAliveList
        }
    }
}
</script>
<style lang="scss">
//这个地方不要加scoped，因为这是所有组件的根组件，后期如果需要设置全局样式，可以只设置在这里就可以了
// @import url("./assets/iconfont/iconfont.css");
@import url("https://at.alicdn.com/t/c/font_3029789_g0pn978wj0n.css");
</style>
