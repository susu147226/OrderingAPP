<template>
    <page-view class="flex flex-col">
        <title-bar :show-back="true">编辑收货地址</title-bar>
        <div class="flex-1 overflow-auto">
            <Form class="mt-4" ref="addressInfoFormEl">
                <CellGroup inset>
                    <Field v-model="addressInfoData.person_name" label="姓名" placeholder="请输入收件人姓名"
                        :rules="[{ required: true, message: '收件人不能为空', trigger: 'onBlur' }]" />
                    <Field v-model="addressInfoData.phone" label="电话" placeholder="请输入收件人电话"
                        :rules="[{ pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '电话号码格式不正确', trigger: 'onBlur' }]" />
                    <Field v-model="addressInfoData.province_city_county" label="地区" placeholder="点击选择地址" readonly
                        is-link @click="isShowPopup = true"
                        :rules="[{ required: true, message: '请选择地址', trigger: 'onBlur' }]" />
                    <Field v-model="addressInfoData.detailAddress" label="详细地址" placeholder="街道门牌信息"
                        :rules="[{ required: true, message: '请选择地址', trigger: 'onBlur' }]" />
                    <Field v-model="addressInfoData.tag" label="标签" placeholder="给地址起个标签吧"
                        :rules="[{ required: true, message: '请选择地址', trigger: 'onBlur' }]" />
                    <div class="px-2 py-3">
                        <Button type="primary" round block size="small" @click="submitForm">保存</Button>
                    </div>
                </CellGroup>
            </Form>
        </div>
    </page-view>
    <Popup v-model:show="isShowPopup" position="bottom" teleport="body">
        <Cascader title="请选择所在地区" :options="cascaderOptions" @finish="cascaderFinish" />
    </Popup>
</template>
<script>
import API from "@/utils/API";
import { Form, CellGroup, Field, Button, Popup, Cascader, Notify, Toast } from "vant";
export default {
    name: "EditAddressInfo",
    data() {
        return {
            isShowPopup: false,
            cascaderOptions: [],
            addressInfoData: {
                id: "",
                phone: "",
                person_name: "",
                tag: "",
                address: "",
                province_city_county: "",
                detailAddress: ""
            },
        }
    },
    created() {
        let id = this.$route.params.id;
        this.findById(id);
        this.addressInfoData.id = id;
        // 现在就可以根据这个id去获取这个地址
        this.getAllList();
    },
    methods: {
        async findById(id) {
            let result = await API.addressInfo.findById(id);
            console.log(result);
            this.addressInfoData.phone = result.phone;
            this.addressInfoData.person_name = result.person_name;
            this.addressInfoData.tag = result.tag;
            this.addressInfoData.id = result.id;
            this.addressInfoData.address = result.address;
            // 拆分address
            let temp = result.address.split(" ");
            this.addressInfoData.province_city_county = temp.slice(0, 3).join(" ");
            this.addressInfoData.detailAddress = temp.pop();


        },
        async getAllList() {
            let result = await API.area.getAllList();
            let list = result.filter(province => province.level === 1).map(item => {
                return {
                    text: item.areaName,
                    value: item.id,
                    children: result.filter(city => city.level === 2 && city.parentId === item.id).map(item => {
                        return {
                            text: item.areaName,
                            value: item.id,
                            children: result.filter(county => county.level === 3 && county.parentId === item.id).map(item => {
                                return {
                                    text: item.areaName,
                                    value: item.id,
                                }
                            })
                        }
                    })
                }
            });
            this.cascaderOptions = list;
        },
        cascaderFinish({ selectedOptions }) {
            this.addressInfoData.province_city_county = selectedOptions.map(item => item.text).join(" ");
            this.isShowPopup = false;
        },
        async submitForm() {
            //先进行表单验证
            this.$refs.addressInfoFormEl.validate().then(() => {
                this.editAddressInfo();
            }).catch(() => {
                Notify({
                    type: "warning",
                    message: "请正确填写内容"
                });
            })
        },
        // 编辑地址
        async editAddressInfo() {
            this.addressInfoData.address = this.addressInfoData.province_city_county + " " + this.addressInfoData.detailAddress;
            await API.addressInfo.update(this.addressInfoData);
            Toast.success("修改成功");
            this.$router.replace({
                name: "AddressInfoList"
            });
        }

    },
    components: {
        Form, CellGroup, Field, Button, Popup, Cascader
    }
}
</script>
<style scoped>

</style>
