<template>
    <v-dialog width="854" v-model="loginData.bShow" overlay-opacity="0.6">
        <v-card color="colorPanelBg" class="d-flex">
            <Advertise :height="562" />
            <v-card color="transparent" width="488">
                <v-card-title class="d-flex justify-end pb-0">
                    <v-btn icon @click="onClose">
                        <v-icon>{{ forgetData.bShow ? "mdi-keyboard-backspace" : "mdi-close" }}</v-icon>
                    </v-btn>
                </v-card-title>
                <AccountForget v-if="forgetData.bShow" />
                <AccountLogin v-else />
            </v-card>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import LoginProxy from "../proxy/LoginProxy";
import AccountForget from "./components/AccountForget.vue";
import AccountLogin from "./components/AccountLogin.vue";
import Advertise from "./components/Advertise.vue";
import BlurUtil from "@/core/global/BlurUtil";
import LoginMediator from "../mediator/LoginMediator";
@Component({
    components: {
        AccountLogin,
        AccountForget,
        Advertise,
    },
})
export default class LoginDialog extends AbstractView {
    private myProxy: LoginProxy = this.getProxy(LoginProxy);
    private loginData = this.myProxy.loginData;
    private forgetData = this.myProxy.forgetData;

    constructor() {
        super(LoginMediator);
    }

    @Watch("loginData.bShow")
    private onWatchShow() {
        BlurUtil(this.loginData.bShow);
    }

    private onClose() {
        if (this.forgetData.bShow) {
            this.forgetData.bShow = false;
        } else {
            this.loginData.bShow = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
</style>
