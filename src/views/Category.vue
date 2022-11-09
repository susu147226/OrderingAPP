<template>
  <page-view class="flex flex-col">
    <title-bar>分类</title-bar>
    <div v-if="isLoading" class="flex justify-center py-[10px]">
      <Loading text-color="#0094ff">正在加载数据···</Loading>
    </div>
    <div v-else class="flex-1 overflow-auto flex flex-row">
      <div class="w-[90px] h-full overflow-auto">
        <Sidebar class="w-full" v-model="selectedIndex" @change="sideBarChange">
          <SidebarItem :title="item.category_name" v-for="item in allCategoryList" :key="item.id"></SidebarItem>
        </Sidebar>
      </div>
      <div class="flex-1 overflow-auto">
        <IndexBar :index-list="[]" ref="rightIndexBar" :sticky="false">
          <template v-for="(item,index) in allCategoryList" :key="item.id">
            <IndexAnchor :index="index">
              <div class="text-primaryColor text-[18px] font-bold py-3px]">{{item.category_name}}</div>
            </IndexAnchor>
           
            <div v-for="f_item in item.foodInfoList" :key="f_item.id"
              class="bg-white h-[90px] relative flex flex-row box-border p-[4px] border-0  border-b border-solid border-gray-200">
              <img v-lazy="baseURL+f_item.food_img"
                class="w-[110px] h-full" alt="" />
              <ul class="flex-1 overflow-auto text-[12px] flex flex-col justify-between ml-[4px]">
                <li class="text-[18px] font-bold">{{f_item.food_name}}</li>
                <li>价格：{{f_item.price}}</li>
              </ul>
              <div class="absolute right-[5px] top-[5px]  rounded-full p-[2px]">
                <span class="iconfont icon-heart text-[24px] text-red-600"></span>
              </div>
            </div>
            <Empty image-size="50px" description="当前分类无菜品信息" v-if="item.foodInfoList.length<=0"></Empty>
          </template>
        </IndexBar>
      </div>
    </div>
  </page-view>
</template>
<script>
import {
  Sidebar,
  SidebarItem,
  IndexBar,
  IndexAnchor,
  Loading,
  Empty,
} from "vant";
import API from "@/utils/API";
export default {
  name: "Category",
  inject: ["baseURL"],
  data() {
    return {
      selectedIndex: 0,
      allCategoryList: [],
      // 表示是否正在请求数据，是否正在加载页面
      isLoading: true,
    };
  },
  created() {
    this.getAllCategoryList();
  },
  methods: {
    async getAllCategoryList() {
      let result = await API.categoryInfo.getAllList();
      this.allCategoryList = result;
      this.isLoading = false;
    },
    sideBarChange(index) {
      console.log(index);
      this.$refs.rightIndexBar.scrollTo(index);
    },
  },
  components: {
    Sidebar,
    SidebarItem,
    IndexBar,
    IndexAnchor,
    Loading,
    Empty,
  },
};
</script>
<style scoped>
</style>