<template>
    <v-card-text class="px-10 mt-5">
        <div class="mt-n12 mb-8 ml-2 font-weight-medium colorBlue--text text-16">账号注册</div>
        <CustomInput class="mb-8" icon="mdi-account" placeholder="请输入推存人（选填）" v-model="form.invite_user_id" />
        <CustomInput class="mb-8" icon="mdi-account" placeholder="请输入邮箱" v-model="form.email" >
            <v-btn class="text-12" color="colorBtnBg" small :disabled="!checkMail(form.email)" @click="getCode">获取验证码</v-btn>
        </CustomInput>
        <CustomInput class="mb-8" icon="mdi-lock" placeholder="请输入密码" type="password" v-model="form.password" />
        <CustomInput class="mb-8" icon="mdi-lock" placeholder="确认密码" type="password" v-model="form.password_confirm" />
        <CustomInput icon="mdi-shield-check" placeholder="请输入验证码" v-model="form.email_code" />
        <div class="text-13 tips-box mt-1 mb-8">
            注册即代表您已阅读并同意
            <button class="tips-box_blue" type="button" @click="goService">《服务协议》</button>
        </div>
        <v-btn class="rounded-lg" color="#6fa9fa" height="48" :disabled="!isCheck" block @click="onRegister">注册</v-btn>
        <div class="tips-box">已有账户?<button class="tips-box_org" @click="goLogin">去登录</button></div>

        <div class="loginByGoogle mt-5 mb-5">
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
import { checkMail, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import GetVerity from "@/views/common/proxy/GetVerityProxy";
import ServiceProxy from "@/views/others/proxy/ServiceProxy";
import Component from "vue-class-component";
import LoginProxy from "../../proxy/LoginProxy";
@Component({
    components: {
        CustomInput,
    },
})
export default class AccountRegister extends AbstractView {
    private myProxy: LoginProxy = this.getProxy(LoginProxy);
    private form = this.myProxy.registerData.form;

    private checkMail = checkMail;

    get isCheck():boolean{
        const {email, password, password_confirm, email_code} = this.form
        return password == password_confirm && checkMail(email) && checkUserPassword(password) && checkVerifyVode(email_code);
    }

    private goLogin() {
        this.myProxy.showLogin();
    }

    private goService() {
        const proxy: ServiceProxy = this.getProxy(ServiceProxy);
        proxy.show();
    }

    private getCode(){
        GetVerity.show(1, this.form.email);
    }

    private onRegister(){
        this.myProxy.api_user_register();
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
.tips-box_blue {
    color: #1b9fff;
}
</style>
