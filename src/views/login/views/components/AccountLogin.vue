<template>
    <v-card-text class="px-10 mt-5">
        <div class="mt-n12 mb-8 ml-2 font-weight-medium colorBlue--text text-16">账号登录</div>
        <CustomInput class="mb-8" icon="mdi-account" placeholder="请输入邮箱" v-model="form.username" />
        <CustomInput icon="mdi-lock" placeholder="请输入密码(6~12位)" type="password" v-model="form.password" />
        <div class="password-operate">
            <button type="button"><i class="iconfont"></i>记住密码</button>
            <button type="button" class="user-action-login-forgetpass" @click="goForget">忘记密码?</button>
        </div>
        <v-btn class="rounded-lg" color="colorBtnBg" height="48" :disabled="!isChecked" block @click="onLogin">登录</v-btn>
        <div class="tips-box">还没有账户?<button class="tips-box_org" @click="goRegister">去注册</button></div>

        <div class="loginByGoogle mt-10 mb-5">
            <div class="d-flex align-center">
                <v-divider />
                <div class="loginTip">或使用以下方式快速登录</div>
                <v-divider />
            </div>
            <ul class="loginWrap">
                <li class="mr-4">
                    <button class="loginBtn" disabled="">
                        <img src="https://hx1web.hstax1tic.com/static/media/Google.b3a2db02.svg" alt="" />Google
                    </button>
                </li>
                <li>
                    <button class="loginBtn">
                        <img src="https://hx1web.hstax1tic.com/static/media/Metamask.7cc94b04.svg" alt="" />Metamask
                    </button>
                </li>
            </ul>
        </div>
    </v-card-text>
</template>

<script lang="ts">
import CustomInput from "@/components/CustomInput.vue";
import AbstractView from "@/core/abstract/AbstractView";
import { checkMail, checkUserPassword } from "@/core/global/Functions";
import Component from "vue-class-component";
import LoginProxy from "../../proxy/LoginProxy";
@Component({
    components: {
        CustomInput,
    },
})
export default class AccountLogin extends AbstractView {
    private myProxy: LoginProxy = this.getProxy(LoginProxy);
    private form = this.myProxy.loginData.form;

    get isChecked(): boolean {
        const { username, password } = this.form;
        return checkMail(username) && checkUserPassword(password);
    }

    private onLogin() {
        this.myProxy.api_user_login();
    }

    private goForget() {
        this.myProxy.forgetData.bShow = true;
    }

    private goRegister() {
        this.myProxy.showRegister();
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/params.scss";
@import "@/style/fontsize.scss";
.password-operate {
    margin: 8px 0 40px;
    display: flex;
    justify-content: space-between;
    color: $color-info;
    font-size: 12px;
    line-height: 16px;
}
.tips-box {
    margin-top: 16px;
    font-size: 12px;
    color: $color-info;
    font-size: 14px;
}
.tips-box_org {
    color: #6fa9fa;
    font-size: 13px;
}

.loginWrap {
    display: flex;
    justify-content: center;
    .loginBtn {
        display: block;
        width: 124px;
        height: 44px;
        margin: 24px auto 0;
        border-radius: 8px;
        font-size: 14px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
}
.loginTip {
    font-size: 12px;
    color: $color-info;
}
</style>
