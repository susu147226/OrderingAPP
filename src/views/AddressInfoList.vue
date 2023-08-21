<template>
    <page-view class="flex flex-col address-list-page">
        <title-bar :show-back="true">我的收货地址</title-bar>
        <div class="flex-1 overflow-auto">
            <my-loading :isLoading="isLoading">
                <AddressList :list="list" @edit="editCurrentAddress">
                    <template #tag="item">
                        <Tag type="danger">{{ item.tag }}</Tag>
                    </template>
                    <template #item-bottom="item">
                        <div class="flex flex-row justify-end">
                            <Button type="danger" size="mini" round plain
                                @click="deleteCurrentAddress(item.id)">删除</Button>
                        </div>
                    </template>
                </AddressList>
            </my-loading>
        </div>
        <div class="box-border px-4 py-2">
            <Button @click="$router.push({ name: 'AddAddressInfo' })" type="primary" block round plain
                size="small">新增收货地址</Button>
        </div>
    </page-view>
</template>
<script>
import API from "@/utils/API";
import { Button, AddressList, Tag, Toast, Dialog } from "vant";
export default {
    name: "AddressInfoList",
    data() {
        return {
            list: [],
            isLoading: false
        }
    },
    created() {
        this.getMyAddressInfoList();
    },
    methods: {
        async getMyAddressInfoList() {
            this.isLoading = true;
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
            this.list = list;
            this.isLoading = false;
        },
        async deleteCurrentAddress(id) {
            Dialog.confirm({
                title: "请确认",
                message: "你确定要删除这个地址吗？"
            }).then(async () => {
                //现在只需要根据这个id去删除就可以了
                //第一件事情 ：发送ajax给服务器，让服务器删除数据
                await API.addressInfo.deleteById(id);
                //第二件事情：删除本地的数据，这样就会重新渲染页面
                let index = this.list.findIndex(item => item.id === id);
                if (index != -1) {
                    this.list.splice(index, 1);
                }
                Toast.success("删除成功");
            }).catch(() => { });


        },
        //编辑地址
        editCurrentAddress(item, index) {
            console.log(item);
            this.$router.push({
                name: "EditAddressInfo",
                params: {
                    id: item.id
                }
            })
        }
    },
    components: {
        Button, AddressList, Tag
    }
}
</script>
<style scoped lang="scss">
.address-list-page {

    // 样式穿透 
    :deep(.van-address-list__bottom) {
        display: none;
    }
}
</style>