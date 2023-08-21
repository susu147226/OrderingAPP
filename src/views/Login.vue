<template>
    <page-view class="flex flex-col">
        <title-bar :show-back="true">登录</title-bar>
        <div class="flex-1 overflow-auto bg-gray-100">
            <Form class="mt-5" ref="loginFormEl">
                <CellGroup inset>
                    <Field v-model="loginUser.zh" label="用户名" placeholder="请输入用户名"
                        :rules="[{ pattern: /\d{11}/, message: '用户名是一个手机号', trigger: 'onBlur' }]" />
                    <Field type="password" v-model="loginUser.password" label="密码" placeholder="请输入密码"
                        :rules="[{ required: true, message: '密码不能为空', trigger: 'onBlur' }]" />
                    <div class="p-5">
                        <Button :disabled="isSubmiting" loading-text="正在登录中" loading-type="spinner"
                            :loading="isSubmiting" @click="checkLogin" type="primary" round block
                            size="small">登录</Button>
                    </div>
                    <div class="text-[12px] text-center py-5">
                        还没有账号，去<router-link class="text-primaryColor" :to="{ name: 'Register' }">注册</router-link>
                    </div>
                </CellGroup>
            </Form>

        </div>
    </page-view>
</template>
<script>
import { Form, Field, CellGroup, Button, Toast } from "vant";
import { mapActions } from "vuex";
import API from "@/utils/API";
export default {
    name: "Login",
    data() {
        return {
            loginUser: {
                zh: "15988886666",
                password: "123456789",
            },
            isSubmiting: false
        };
    },
    methods: {
        ...mapActions(["setLoginUserInfo", "setToken"]),
        checkLogin() {
            //第一步：先验证表单
            this.$refs.loginFormEl
                .validate()
                .then(() => {
                    console.log("验证通过");
                    //在讲登录请求之前，我们要讲一个vuex的全局状态管理，这个东西先等注册完成
                    this.submitLoginForm();
                })
                .catch(() => {
                    console.log("验证没有通过");
                });
        },
        async submitLoginForm() {
            this.isSubmiting = true;
            try {
                let result = await API.userInfo.checkLogin(this.loginUser);
                Toast.success("登录成功");
                // this.$store.dispatch("setLoginUserInfo",result.loginUserInfo);   //旧的写支
                this.setLoginUserInfo(result.loginUserInfo);
                this.setToken(result.token);
                this.$router.back();
            } catch (error) {
                Toast.fail("登录失败");
            }
            finally {
                this.isSubmiting = false;
            }
        }
    },
    components: {
        Form,
        Field,
        CellGroup,
        Button,
    },
};
</script>
<style>

</style>