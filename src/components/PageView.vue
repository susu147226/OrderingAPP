<template>
    <div class="page-view">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "PageView",
};
</script>
<style lang="scss" scoped>
.page-view {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: white;
}
</style>