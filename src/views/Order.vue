<template>
    <page-view class="flex flex-col">
        <title-bar>订单</title-bar>
        <div class=" flex-1 overflow-auto bg-gray-100">
            <my-loading :isLoading="isFirstLoading" v-if="loginUserInfo">
                <PullRefresh v-model="isLoading" @refresh="refreshData">
                    <List finished-text="没有更多数据了" loading-text="正在加载数据" :finished="pageIndex >= pageCount"
                        :loading="isLoading" @load="loadNextPageOrder">
                        <TransitionGroup enter-active-class="animate__animated animate__slideInUp">
                            <div class="bg-white box-border p-5 my-4" v-for="(item, index) in listData" :key="item.id">
                                <ul class="text-[14px] leading-[28px]">
                                    <li><span class="font-bold">订单编号：</span>{{ item.id }}</li>
                                    <li><span class="font-bold">订单时间：</span>{{ formatDateTime(item.submit_time) }}</li>
                                    <li><span class="font-bold">菜品总数：</span>{{ item.orderDetailList.length }}</li>
                                    <li><span class="font-bold">订单金额：</span>￥ {{ item.order_money }}</li>
                                    <li><span class="font-bold">订单状态：</span>{{ item.order_status }}</li>
                                </ul>
                                <Steps ref="step" :active="orderStatusMap.indexOf(item.order_status)">
                                    <Step>未付款</Step>
                                    <Step>已付款</Step>
                                    <Step>已发货</Step>
                                    <Step>交易完成</Step>
                                </Steps>
                                <p class=" text-[14px] font-bold">订单列表</p>
                                <ul class="text-[12px] food-list">
                                    <li>
                                        <span>1.南瓜八宝粥 x 28.00</span>
                                        <span>1</span>
                                    </li>
                                </ul>
                                <div class="flex flex-row justify-between">
                                    <div class="py-4 flex flex-row justify-start">
                                        <Button type="danger" size="mini" plain @click="dePayPrice(item, index)"
                                            v-if="item.order_status === '已付款'">退款</Button>
                                        <Button type="success" size="mini" plain
                                            v-if="item.order_status === '交易成功'">分享</Button>
                                    </div>
                                    <div class="py-4 flex flex-row justify-end">
                                        <Button type="primary" size="mini" plain
                                            v-if="item.order_status === '已发货'">评价</Button>
                                        <Button type="primary" @click="payPrice(item, index)" size="mini" plain
                                            v-if="item.order_status === '未付款'">付款</Button>
                                    </div>
                                </div>
                            </div>
                        </TransitionGroup>
                    </List>
                </PullRefresh>
            </my-loading>
            <p class="text-center py-10 text-[14px]" v-else>
                你还没有登录，请先去
                <router-link class="text-primaryColor" :to="{ name: 'Login' }">登录</router-link>
            </p>
        </div>
    </page-view>
</template>
<script>
import API from "@/utils/API";
import { Steps, Step, Button, List, PullRefresh } from "vant";
import { formatDateTime } from "@/utils/DateTimeUtils";
import { mapGetters } from "vuex";
export default {
    name: "Order",
    data() {
        return {
            isFirstLoading: true,
            isLoading: false,
            pageIndex: 1,
            pageCount: 0,
            listData: [],
            orderStatusMap: ["未付款", "已付款", "已发货", "交易完成"],

        }
    },
    computed: {
        ...mapGetters(["loginUserInfo"])
    },
    created() {
        if (this.loginUserInfo) {
            this.getMyOrderListByPage({ pageIndex: this.pageIndex });
        }
    },
    activated() {
        if (this.loginUserInfo && this.isFirstLoading) {
            this.getMyOrderListByPage({ pageIndex: this.pageIndex });
        }
    },
    methods: {
        formatDateTime,
        async getMyOrderListByPage({ pageIndex, isRefresh = false }) {
            this.isLoading = true;
            let result = await API.orderInfo.getMyOrderListByPage({ pageIndex });
            this.pageIndex = result.pageIndex;
            this.pageCount = result.pageCount;
            if (isRefresh) {
                //说明这里是刷新的请求数据，那么之前的数据就可以不用要了，直接替换
                this.listData = result.listData;
            }
            else {
                this.listData.push(...result.listData);
            }
            this.isLoading = false;
            this.isFirstLoading = false;
        },
        loadNextPageOrder() {
            this.pageIndex++;
            this.getMyOrderListByPage({ pageIndex: this.pageIndex });
        },
        //下拉刷新
        refreshData() {
            this.pageIndex = 1;
            this.getMyOrderListByPage({ pageIndex: this.pageIndex, isRefresh: true });
        },
        payPrice(item, index) {
            // API
            this.listData[index].order_status = "已付款";
        },
        dePayPrice(item, index) {
            this.listData[index].order_status = "未付款";
        },
    },
    components: {
        Steps, Step, Button, List, PullRefresh,
    }
};
</script>
<style lang="scss" scoped>
.food-list {
    >li {
        @apply border-0 border-b border-dashed border-gray-400 py-6;
    }
}
</style>