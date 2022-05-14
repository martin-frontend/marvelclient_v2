<template>
    <v-card-text class="px-10 mt-5">
        <div class="mt-n12 mb-8 ml-2 font-weight-medium colorBlue--text text-16">密码找回</div>
        <CustomInput class="mb-10" icon="mdi-email" placeholder="请输入邮箱" v-model="form.email">
            <v-btn class="text-12" color="colorBtnBg" small :disabled="!checkMail(form.email)" @click="getCode">获取验证码</v-btn>
        </CustomInput>
        <CustomInput class="mb-10" icon="mdi-shield-check" placeholder="请输入验证码" type="tel" v-model="form.email_code" />
        <CustomInput class="mb-10" icon="mdi-lock" placeholder="请输入密码" type="password" v-model="form.password" />
        <CustomInput class="mb-10" icon="mdi-lock" placeholder="密码确认" type="password" v-model="form.password_confirm" />
        <v-btn class="rounded-lg" color="colorBtnBg" height="48" :disabled="!isChecked" block @click="onSubmit">提交</v-btn>
    </v-card-text>
</template>

<script lang="ts">
import CustomInput from "@/components/CustomInput.vue";
import AbstractView from "@/core/abstract/AbstractView";
import { checkMail, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import GetVerity from "@/views/common/proxy/GetVerityProxy";
import Component from "vue-class-component";
import LoginProxy from "../../proxy/LoginProxy";
@Component({
    components: {
        CustomInput,
    },
})
export default class AccountForget extends AbstractView {
    private myProxy: LoginProxy = this.getProxy(LoginProxy);
    private form = this.myProxy.forgetData.form;

    private checkMail = checkMail;

    get isChecked(): boolean {
        const { email, email_code, password, password_confirm } = this.form;
        return password == password_confirm && checkMail(email) && checkVerifyVode(email_code) && checkUserPassword(password);
    }

    private getCode(){
        GetVerity.show(2, this.form.email);
    }

    private onSubmit() {
        this.myProxy.api_user_reset_password();
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
.input-text {
    border-radius: 12px;
    height: 54px;
    border: solid 1px #50607f;
    input {
        vertical-align: middle;
        height: 54px;
        width: 100%;
        color: rgba(157, 177, 216, 0.7);
        font-weight: bold;
    }
}
input::placeholder {
    color: #50607f;
}
</style>
