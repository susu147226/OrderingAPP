<template>
    <page-view class="flex flex-col address-list-page">
        <title-bar :show-back="true">我的收货地址</title-bar>
        <div class="flex-1 overflow-auto">
            <AddressList
            :list="list">
            <template #tag="item">
                <Tag type="danger">{{item.tag}}</Tag>
            </template>
            <template #item-bottom>
                <div class="flex flex-row justify-end">
                    <Button type="danger" size="mini" round plain>删除</Button>
                </div>
            </template>
        </AddressList>
        </div>
        <div class="box-border px-4 py-2">
            <Button @click="$router.push({ name: 'AddAddressInfo' })" type="primary" block round plain
                size="small">新增地址</Button>
        </div>
    </page-view>
</template>
<script>
import API from "@/utils/API";
import { Button, AddressList,Tag } from "vant";
export default {
    name: "AddressInfoList",
    data(){
        return {
            list:[]
        }
    },
    created(){
        this.getMyAddressInfoList();
    },  
    methods:{
        async getMyAddressInfoList(){
            let result = await API.addressInfo.getMyAddressInfoList();
            let list = result.map(item=>{
                return {
                    id:item.id,
                    name:item.person_name,
                    tel:item.phone,
                    address:item.address,
                    tag:item.tag
                }
            })
            this.list = list;
        }
    },
    components: {
        Button, AddressList,Tag
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