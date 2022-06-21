<template>
    <v-app>
        <div id="page">
            <Header v-if="!($vuetify.breakpoint.mobile && $route.path == '/page_game_play')" />
            <v-main>
                <router-view />
            </v-main>
            <Footer v-if="!$vuetify.breakpoint.mobile" />
            <MobileMenu v-if="$vuetify.breakpoint.mobile && $route.path != '/page_game_play'" />
            <Overlay v-model="gameProxy.loading" />
        </div>
        <DialogMessage />
        <GameSearch />
        <div id="dialog_container"></div>
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
import Header from "@/views/header/views/Header.vue";
import Footer from "./views/footer/Footer.vue";
import MobileMenu from "./views/mobile_menu/MobileMenu.vue";
import DialogMessage from "./views/dialog_message/views/DialogMessage.vue";
import Overlay from "./views/widget/overlay/Overlay.vue";
import GameProxy from "./proxy/GameProxy";
import getProxy from "./core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Watch } from "vue-property-decorator";
import GameSearch from "./views/game_search/views/GameSearch.vue";
import OpenLink from "./core/global/OpenLink";

@Component({
    components: {
        DialogMessage,
        Header,
        Footer,
        MobileMenu,
        GameSearch,
        Overlay,
    },
})
export default class APP extends Vue {
    gameProxy: GameProxy = getProxy(GameProxy);
    LangUtil = LangUtil;

    onService(){
        OpenLink(LangUtil("客服链接"));
    }
}
</script>
<style lang="scss" scoped>
.customer {
    position: fixed;
    right: 55px;
    bottom: 60px;
}
</style>
