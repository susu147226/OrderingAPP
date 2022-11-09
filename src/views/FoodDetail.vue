<template>
  <page-view class="flex flex-col">
    <title-bar :show-back="true">
      【{{foodDetail?.food_name}}】菜品的详细
      <template #menu>
        <Icon name="share-o" :size="22" @click="showShare=true" />
      </template>
    </title-bar>
    <my-loading :isLoading="!foodDetail">
      <div class="flex-1 overflow-auto pb-[var(--van-action-bar-height)]" ref="foodInfoContent">
        <List v-model:loading="isLoading" :finished="finished" finished-text="没有更多了" @load="loadNextPageComment">
          <!-- 菜品图片 -->
          <div class="w-full h-[230px]">
            <img crossorigin="anonymous" v-lazy="baseURL+foodDetail.food_img" class="w-full h-full object-cover" alt="">
          </div>
          <!-- 菜品的基本信息 -->
          <ul class="text-[14px] leading-[24px] box-border p-[5px] border-0 border-b border-dashed border-gray-500">
            <li>
              <span class="font-bold">菜品名称：</span>{{foodDetail.food_name}}
            </li>
            <li>
              <span class="font-bold">菜品价格：</span>￥ {{foodDetail.price}}
            </li>
            <li>
              <span class="font-bold">菜品分类：</span>{{foodDetail.categoryInfo.category_name}}
            </li>
            <li class="indent-[2em]">
              {{foodDetail.food_desc}}
            </li>
          </ul>
          <!-- 评论信息 -->
          <div class="p-[5px]">
            <div class=" text-primaryColor font-bold text-[18px]">最新评论</div>
            <transition-group enter-active-class="animate__animated animate__slideInUp">
              <div class="comment-item" v-for="item in commentInfoList" :key="item.id">
                <div class="flex flex-row py-2 items-center">
                  <img crossorigin="anonymous" v-lazy="baseURL+item.userInfo.user_photo" class="w-[40px] h-[40px] rounded-full" alt="">
                  <div class="flex-1 ml-2">{{item.userInfo.nickName}}</div>
                  <div class="h-[40px] flex flex-col justify-between">
                    <div class="text-[12px] text-gray-600">{{formatDateTime(item.create_time)}}</div>
                    <Rate v-model="item.star" color="#ffd21e" void-icon="star" void-color="#eee" />
                  </div>
                </div>
                <div class="text-[14px] leading-[24px]">
                  {{item.comment_text}}
                </div>
              </div>
            </transition-group>
          </div>
        </List>
      </div>
      <ActionBar>
        <ActionBarIcon icon="cart-o" text="购物车" badge="0"></ActionBarIcon>
        <ActionBarIcon icon="balance-o" text="金额" badge="0"></ActionBarIcon>
        <ActionBarIcon icon="star" text="已收藏" color="#ff5000"></ActionBarIcon>
        <ActionBarButton type="warning" text="加入购物车"></ActionBarButton>
        <ActionBarButton type="danger" text="立即购买"></ActionBarButton>
      </ActionBar>
    </my-loading>
  </page-view>
  <ShareSheet v-model:show="showShare" title="立即分享给好友" :options="shareOptions"
    @select="shareOptionSelect"></ShareSheet>
</template>
<script>
import {
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Rate,
  List,
  Icon,
  ShareSheet,
  Toast,
  ImagePreview,
  Dialog,
} from "vant";
import API from "@/utils/API";
import { formatDateTime } from "@/utils/DateTimeUtils";
import useClipboard from "vue-clipboard3";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

export default {
  name: "FoodDetail",
  inject: ["baseURL"],
  data() {
    return {
      foodDetail: null,
      star: 3,
      fid: null,
      pageIndex: 1,
      pageCount: 0,
      // 评论列表
      commentInfoList: [],
      isLoading: false,
      // 配置分享的信息
      shareOptions: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      // 是否显示分享的面板
      showShare: false,
    };
  },
  async created() {
    let id = this.$route.params.id;
    this.fid = id;
    await this.findById(id);
    await this.getCommentInfoListByFid({ fid: id, pageIndex: this.pageIndex });
  },
  computed: {
    finished() {
      return this.pageIndex >= this.pageCount;
    },
  },
  methods: {
    async findById(id) {
      let result = await API.foodInfo.findById(id);
      this.foodDetail = result;
    },
    async getCommentInfoListByFid({ fid, pageIndex }) {
      this.isLoading = true;
      let result = await API.commentInfo.getCommentInfoListByFid({
        fid,
        pageIndex,
      });
      this.pageIndex = result.pageIndex;
      this.pageCount = result.pageCount;
      //因为要考虑到后期的加载下一页，所以评论的数据不能直接赋值 ，应该是追加
      this.commentInfoList.push(...result.listData);
      this.isLoading = false;
    },
    //加载下一页的评论
    loadNextPageComment() {
      this.pageIndex++;
      this.getCommentInfoListByFid({
        fid: this.fid,
        pageIndex: this.pageIndex,
      });
    },
    formatDateTime,
    async shareOptionSelect(option, index) {
      if (index === 2) {
        this.shareFoodLink();
      } else if (index === 3) {
        this.shareFoodPost();
      } else if (index === 4) {
        this.shareQRCode();
      }
      this.showShare = false;
    },
    //分享二维码,我们希望将当前的网址生成二维码
    shareQRCode() {
      // DataURL就是base64
      QRCode.toDataURL(location.href).then((base64Str) => {
        // 得到了这个base64的字符串以后，我们就可以将这个字符串以图片的形式显示图片，而vant里面就有预览图片
        ImagePreview({
          images: [base64Str],
          onClose() {
            Dialog.confirm({
              title: "请确定",
              message: "要将分享二维码保存在本地吗？",
            })
              .then(() => {
                let a = document.createElement("a");
                a.href = base64Str;
                a.download = "分享二维码.png";
                a.click();
              })
              .catch(() => {});
          },
        });
      });
    },
    //分享菜品的海报
    async shareFoodPost() {
      //给一个拍照的音效
      let audio = new Audio();
      audio.src = require("../assets/audio/camera.mp3");
      audio.play();

      //生成海报
      let canvas = await html2canvas(this.$refs.foodInfoContent, {
        useCORS: true,
      });
      let ctx = canvas.getContext("2d");
      ctx.save();
      let x = parseInt(canvas.style.width) / 2;
      let y = parseInt(canvas.style.height) / 2;
      ctx.translate(x, y);
      ctx.fillStyle = "red";
      ctx.font = "36px 微软雅黑";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.rotate(-Math.PI / 4);
      //创建渐变
      let grd = ctx.createLinearGradient(-x, -y, canvas.width, canvas.height);
      grd.addColorStop(0, "red");
      grd.addColorStop(0.5, "gold");
      grd.addColorStop(1, "blue");
      ctx.fillStyle = grd;
      ctx.fillText("H2204·美食分享", 0, 0);
      ctx.restore();
      //创建二维码的图片，画在海报上面
      let qrCodeBase64Str = await QRCode.toDataURL(location.href);
      let img = new Image();
      img.src = qrCodeBase64Str;
      img.onload = () => {
        ctx.drawImage(img, 10, 50, 100, 100);
        //将canvas上面的信息转换成base64的字符串
        let base64Str = canvas.toDataURL("image/png");
        ImagePreview({
          images: [base64Str],
          className: "animate__animated animate__bounceIn",
        });
        //下载海报图片
        let a = document.createElement("a");
        a.href = base64Str;
        a.download = `${this.foodDetail.food_name}海报.png`;
        a.click();
      };
    },
    //分享菜品的链接
    shareFoodLink() {
      //说明用户点击的是复制连接
      const { toClipboard } = useClipboard();
      toClipboard(
        `嗨，我发现了一个非常好吃的东西，现在分享给你看一下。${location.href}`
      ).then(() => {
        Toast.success("复制成功，快发给你的小伙吧");
      });
    },
  },
  components: {
    ActionBar,
    ActionBarIcon,
    ActionBarButton,
    Rate,
    List,
    Icon,
    ShareSheet,
  },
};
</script>
<style>
</style>