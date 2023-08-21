<template>
    <page-view class="flex flex-col">
        <title-bar :show-back="true">购物车列表</title-bar>
        <my-loading :isLoading="isFirstLoading">
            <div class="flex-1 overflow-auto pb-[var(--van-submit-bar-height)]">
                <Tabs animated v-model:active="selectedIndex">
                    <Tab title="购物车列表">
                        <List finished-text="数据已经加载完毕" :loading="isLoading" :finished="finished"
                            @load="loadNextShopCartPage">
                            <TransitionGroup leave-active-class="animate__animated animate__bounceOutLeft">
                                <SwipeCell v-for="item in shopCartListData" :key="item.id">
                                    <Card :thumb="baseURL + item.foodInfo.food_img" :title="item.foodInfo.food_name"
                                        :price="item.foodInfo.price">
                                        <template #tags>
                                            <Stepper @plus="plusOne(item.fid)" @minus="minusOne(item.fid)"
                                                class="num-box" min="1" max="100" v-model="item.count" theme="round"
                                                button-size="16">
                                            </Stepper>
                                        </template>
                                        <template #num>
                                            <span class="text-red-500">小计：{{ item.foodInfo.price * item.count }}</span>
                                        </template>
                                    </Card>
                                    <template #right>
                                        <Button type="danger" square class="h-full"
                                            @click="deleteCurrentItem(item.id)">删除</Button>
                                    </template>
                                </SwipeCell>
                            </TransitionGroup>
                        </List>
                    </Tab>
                    <Tab title="地址列表">
                        <AddressList v-model="chosenAddressId" :list="myAddressInfoList">
                        </AddressList>
                    </Tab>
                </Tabs>
            </div>
            <SubmitBar :price="totalMoney" button-text="提交订单" @submit="submitOrder"></SubmitBar>
        </my-loading>

    </page-view>
</template>
<script>
import { Tab, Tabs, Card, Stepper, SwipeCell, Button, Dialog, SubmitBar, List, AddressList, Notify, Toast } from "vant";
import API from "@/utils/API";
export default {
    name: "ShopCartList",
    inject: ["baseURL"],
    data() {
        return {
            test: 3,
            pageIndex: 1,
            pageCount: 0,
            shopCartListData: [],
            isLoading: false,
            isFirstLoading: true,
            // 我的地址列表
            myAddressInfoList: [],
            // 选择地址的id
            chosenAddressId: "",
            // tab页面的选中的那个索引
            selectedIndex: 0,
        }
    },
    computed: {
        totalMoney() {
            let sum = 0;
            this.shopCartListData.forEach(item => {
                sum += item.count * item.foodInfo.price;
            });
            return sum * 100;
        },
        finished() {
            return this.pageIndex >= this.pageCount;
        }
    },
    created() {
        // 获取我的购物车
        this.getShopCartListByPage({ pageIndex: this.pageIndex });
        //获取我的地址
        this.getMyAddressInfoList();
    },
    methods: {
        async getShopCartListByPage({ pageIndex }) {
            let result = await API.shopCart.getShopCartListByPage({ pageIndex });
            this.pageCount = result.pageCount;
            this.shopCartListData.push(...result.listData);
            this.isFirstLoading = false;
        },
        async deleteCurrentItem(id) {
            Dialog.confirm({
                title: "请确认",
                message: "你确定要删除这一项吗"
            }).then(async () => {
                await API.shopCart.deleteMyShopCartFoodById(id);
                //这个时候的页面如果要刷新有2种方案，第一种重新请求数据【这种体验不好】
                //第二种，在数据当中找到这一项，删除
                let index = this.shopCartListData.findIndex(item => item.id === id);
                if (index != -1) {
                    this.shopCartListData.splice(index, 1);
                }
            }).catch(() => { })

        },
        // 购物车当前物品加一个
        plusOne(fid) {
            API.shopCart.addToShopCart({ fid, count: 1 });
        },
        // 购物车当前物品减一个
        minusOne(fid) {
            API.shopCart.addToShopCart({ fid, count: -1 });
        },
        loadNextShopCartPage() {
            this.pageIndex++;
            this.getShopCartListByPage({ pageIndex: this.pageIndex });
        },
        async getMyAddressInfoList() {
            let result = await API.addressInfo.getMyAddressInfoList();
            let list = result.map(item => {
                return {
                    id: item.id,
                    name: item.person_name,
                    tel: item.phone,
                    address: item.address,
                    tag: item.tag
                }
            })
            this.myAddressInfoList = list;
        },
        async submitOrder() {
            // 提交订单之前,一定要看一下当前的用户有没有选择地址
            if (this.chosenAddressId) {
                // 第一步:先构建要提交的订单的参数
                let orderData = {
                    aid: this.chosenAddressId,
                    foodList: this.shopCartListData.map(item => {
                        return {
                            fid: item.fid,
                            count: item.count
                        }
                    })
                }

                await API.orderInfo.submitOrder(orderData);
                Toast.success("订单提交成功");
                this.$router.replace({ name: "Order" });

            }
            else {
                Notify({
                    type: "warning",
                    message: "请先选择地址"
                });
                this.selectedIndex = 1;
            }
        }
    },
    components: {
        Tab, Tabs, Card, Stepper, SwipeCell, Button, SubmitBar, List, AddressList
    }
}
</script>
<style scoped lang="scss">
.num-box {
    margin-top: 20px;
}

// 样式穿透 
:deep(.van-address-list__bottom) {
    display: none;
}
</style>