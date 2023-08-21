<template>
    <page-view class="flex flex-col">
        <title-bar :show-back="true">注册</title-bar>
        <div class="flex-1 overflow-auto bg-gray-100">
            <Form class="my-5" ref="registerFormEl">
                <CellGroup inset>
                    <Field label="昵称" placeholder="请输入昵称" v-model="userInfo.nickName"
                        :rules="[{ required: true, message: '昵称不能为空', trigger: 'onBlur' }]" />

                    <Field label="密码" placeholder="请输入密码" v-model="userInfo.password"
                        :rules="[{ required: true, message: '密码不能为空', trigger: 'onBlur' }]" />

                    <Field label="确认密码" placeholder="请输入确认密码" v-model="userInfo.confirmPwd"
                        :rules="[{ required: true, message: '确认密码不能为空', trigger: 'onBlur' }, { validator: validatePwd, message: '密码不符合要求', trigger: 'onBlur' }]" />

                    <Field label="性别">
                        <template #input>
                            <RadioGroup v-model="userInfo.user_sex" direction="horizontal">
                                <Radio name="男">男</Radio>
                                <Radio name="女">女</Radio>
                            </RadioGroup>
                        </template>
                    </Field>

                    <Field label="手机号码" placeholder="请输入手机号码" v-model="userInfo.user_phone"
                        :rules="[{ pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号格式不正确', trigger: 'onBlur' }]" />

                    <Field label="邮箱" placeholder="请输入邮箱" v-model="userInfo.user_email"
                        :rules="[{ pattern: new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/), message: '请输入正确的邮箱格式', trigger: 'onBlur' }]" />

                    <!-- 用户头像 -->
                    <Field label="用户头像">
                        <template #input>
                            <Uploader :after-read="afterRead" v-model="imageList" :max-count="1" />
                        </template>
                    </Field>
                    <div class="p-5">
                        <Button @click="formSubmit" :loading="isSubmiting" loading-type="spinner" loading-text="正在提交数据"
                            type="primary" size="small" round block>提交</Button>
                    </div>
                </CellGroup>
            </Form>
        </div>
    </page-view>
</template>
<script>
import {
    Form,
    Field,
    CellGroup,
    Button,
    Uploader,
    Radio,
    RadioGroup,
    Notify,
} from "vant";
import API from "@/utils/API";
export default {
    name: "Register",
    inject: ["baseURL"],
    data() {
        return {
            userInfo: {
                nickName: "",
                user_sex: "男",
                user_phone: "",
                user_email: "",
                password: "",
                confirmPwd: "",
                user_photo: "",
            },
            isSubmiting: false,
            imageList: [],
        };
    },
    methods: {
        //编写一个自定义的函数,判断密码与确认密码是否相同
        validatePwd() {
            if (this.userInfo.confirmPwd === "") {
                return false;
            }
            if (this.userInfo.confirmPwd != this.userInfo.password) {
                return false;
            }
        },
        formSubmit() {
            this.$refs.registerFormEl
                .validate()
                .then(() => {
                    console.log("验证成功");
                    this.submitData();
                })
                .catch(() => {
                    console.log("验证失败");
                });
        },
        submitData() {
            this.isSubmiting = true;
            API.userInfo
                .add(this.userInfo)
                .then((result) => {
                    Notify({
                        type: "success",
                        message: "注册成功",
                        onClose: () => {
                            this.$router.replace({ name: "Login" });
                        },
                    });
                })
                .catch((error) => {
                    Notify({
                        type: "warning",
                        message: "注册失败",
                    });
                })
                .finally(() => {
                    this.isSubmiting = false;
                });
        },
        async afterRead(file) {
            console.log(file);
            //将file里面的文件进行上传
            let result = await API.userInfo.uploadUserPhoto(file.file);
            //result就是请求回来的地址，它是一个图片的路由
            this.userInfo.user_photo = result;
            this.imageList = [
                {
                    url: this.baseURL + result,
                },
            ];
        },
    },
    components: {
        Form,
        Field,
        CellGroup,
        Button,
        Uploader,
        Radio,
        RadioGroup,
    },
};
</script>
<style scoped>

</style>