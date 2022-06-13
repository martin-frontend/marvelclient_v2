<template>
    <v-app>
        <div id="page">
            <Header />
            <v-main>
                <router-view />
            </v-main>
            <Footer v-if="!$vuetify.breakpoint.mobile" />
            <MobileMenu v-else />
            <Overlay v-model="gameProxy.loading" />
        </div>
        <DialogMessage />
        <div id="dialog_container"></div>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/views/header/views/Header.vue";
import Footer from "./views/footer/Footer.vue";
import MobileMenu from "./views/mobile_menu/MobileMenu.vue";
import DialogMessage from "./views/dialog_message/views/DialogMessage.vue";
import Overlay from "./views/widget/overlay/Overlay.vue";
import GameProxy from "./proxy/GameProxy";
import getProxy from "./core/global/getProxy";

@Component({
    components: {
        DialogMessage,
        Header,
        Footer,
        MobileMenu,
        Overlay,
    },
})
export default class APP extends Vue {
    gameProxy: GameProxy = getProxy(GameProxy);
}
</script>
