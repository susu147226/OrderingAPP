<template>
    <page-view class="flex flex-col">
        <title-bar> 食味斋</title-bar>
        <div class="flex-1 overflow-auto">
            <Skeleton :row="8" :loading="isFirstLoading">
                <List v-model:loading="isLoading" :finished="finished" finished-text="没有更多了" @load="loadNextPage"
                    loading-text="正在加载下一页数据">
                    <!-- 轮播图 -->
                    <Swipe class="h-[200px]" :autoplay="5000">
                        <SwipeItem v-for="item in swiperImage" :key="item">
                            <img :src="baseURL + item" class="w-full h-full object-cover" alt="">
                        </SwipeItem>
                    </Swipe>
                    <!-- 菜品列表 -->
                    <transition-group enter-active-class="animate__animated animate__slideInUp">
                        <food-item v-for="item in listData" :key="item.id" :item-data="item"></food-item>
                    </transition-group>
                </List>
            </Skeleton>

        </div>
    </page-view>
</template>
<script>
import { Swipe, SwipeItem, List, Skeleton } from "vant";
import FoodItem from "../components/FoodItem.vue";
import API from "@/utils/API";

export default {
    name: "ChooseFood",
    inject: ["baseURL"],
    data() {
        return {
            pageIndex: 1,
            listData: [],
            pageCount: 0,
            swiperImage: [],
            isLoading: false,
            isFirstLoading: true
        };
    },
    created() {
        this.getListByPage();
    },
    methods: {
        async getListByPage(pageIndex = 1) {
            this.isLoading = true;
            try {
                let result = await API.foodInfo.getListByPage({ pageIndex });
                console.log(result);
                this.pageIndex = result.pageIndex;
                this.listData.push(...result.listData);
                this.pageCount = result.pageCount;
                //取前4张图片完成操作
                if (pageIndex == 1) {
                    this.swiperImage = result.listData.slice(0, 4).map((item) => {
                        return item.food_img;
                    });
                }
                this.isFirstLoading = false;
            } catch (error) {
            } finally {
                this.isLoading = false;
            }
        },
        // 加载下一页
        loadNextPage() {
            this.pageIndex++;
            this.getListByPage(this.pageIndex);
        },
    },
    computed: {
        finished() {
            return this.pageIndex >= this.pageCount;
        },
    },
    components: {
        Swipe,
        SwipeItem,
        FoodItem,
        List,
        Skeleton,
    },
};
</script>
<style scoped lang="scss">

</style>