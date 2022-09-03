<template>
    <v-app>
        <div id="page">
            <Header />
            <v-main>
                <router-view />
            </v-main>
            <Footer v-if="!$vuetify.breakpoint.mobile" />
            <MobileMenu v-else />
        </div>
        <DialogMessage />
        <div id="dialog_container"></div>
        <!-- 客服 -->
        <v-img
            width="64"
            height="64"
            src="@/_skin100/assets/service/service.png"
            class="customer rounded-pill"
            @click="onService"
            v-if="!$vuetify.breakpoint.mobile"
        />
        <v-img
            width="40"
            height="40"
            src="@/_skin100/assets/service/service.png"
            class="customer-h5 rounded-pill"
            @click="onService"
            v-else
        />
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/_skin100/views/header/views/Header.vue";
import Footer from "@/_skin100/views/footer/Footer.vue";
import MobileMenu from "@/_skin100/views/mobile_menu/MobileMenu.vue";
import DialogMessage from "@/_skin100/views/dialog_message/views/DialogMessage.vue";
import APP from "./App";

@Component({
    components: {
        DialogMessage,
        Header,
        Footer,
        MobileMenu,
    },
})
export default class extends APP {}
</script>

<style lang="scss" scoped>
.customer {
    cursor: pointer;
    z-index: 100;
    position: fixed;
    right: 10px;
    bottom: 30px;
}
.customer-h5 {
    cursor: pointer;
    z-index: 100;
    position: fixed;
    right: 5px;
    bottom: 80px;
}
.btn-guide {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 90px;
}
</style>
