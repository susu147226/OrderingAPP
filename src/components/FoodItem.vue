<template>
  <div class="bg-white h-[90px] relative flex flex-row box-border p-[4px] border-0  border-b border-solid border-gray-200">
    <van-image
      :src="baseURL+itemData.food_img"
      class="w-[110px] h-full" alt="" 
      lazy-load @click="showImage(baseURL+itemData.food_img)" />
    <ul class="flex-1 overflow-auto text-[12px] flex flex-col justify-between ml-[4px]">
      <li class="text-[18px] font-bold">{{itemData.food_name}}</li>
      <li class=" text-red-500">月售：{{itemData.saleCount}}</li>
      <li>价格：{{itemData.price}}</li>
      <li>分类：{{itemData.categoryInfo.category_name}}</li>
    </ul>
    <div class="absolute right-[5px] top-[5px]  rounded-full p-[2px]">
      <span class="iconfont icon-heart text-[24px] text-red-600"></span>
    </div>
  </div>
</template>
<script>
import { Image as VanImage,ImagePreview } from "vant";
export default {
  name: "FoodItem",
  props: ["itemData"],
  inject: ["baseURL"],
  methods:{
    showImage(src){
      ImagePreview([src]);
    }
  },
  components: {
    VanImage,
  },
};
</script>
<style scoped>
</style>