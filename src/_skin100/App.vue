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
        <v-btn
            height="42"
            color="#ffb01b"
            class="customer rounded-xl black--text font-weight-bold d-flex align-center text-h6"
            @click="onService"
            v-if="!$vuetify.breakpoint.mobile"
        >
            <v-icon class="mr-1">mdi-message-text-outline</v-icon>
            <span class="mb-1">{{ LangUtil("客服") }}</span>
        </v-btn>
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
    z-index: 100;
    position: fixed;
    right: 55px;
    bottom: 60px;
    z-index: 100;
}
.btn-guide {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 90px;
}
</style>
