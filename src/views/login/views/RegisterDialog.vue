<template>
    <v-dialog width="854" v-model="registerData.bShow" overlay-opacity="0.6" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card color="colorPanelBg" class="d-flex">
            <AdvertiseInLogin :height="794" class="d-none d-md-flex"/>
            <v-card color="transparent" width="488">
                <v-card-title class="d-flex justify-end pb-0">
                    <v-btn icon @click="onClose">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <AccountRegister />
            </v-card>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import LoginProxy from "../proxy/LoginProxy";
import AccountRegister from "./components/AccountRegister.vue";
import Advertise from "./components/Advertise.vue";
@Component({
    components: {
        AdvertiseInLogin,
        AccountRegister,
    },
})
export default class RegisterDialog extends AbstractView {
    private myProxy: LoginProxy = this.getProxy(LoginProxy);
    private registerData = this.myProxy.registerData;

    private onClose() {
        this.myProxy.registerData.bShow = false;
    }

    @Watch("registerData.bShow")
    private onWatchShow() {
        BlurUtil(this.registerData.bShow);
    }
}
</script>

<style lang="scss" scoped></style>
