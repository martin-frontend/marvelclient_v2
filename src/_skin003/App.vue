<template>
    <v-app>
        <div id="page" style="background-color: #000000">
            <Header v-show="!($vuetify.breakpoint.mobile && $route.path == '/page_game_play')" />
            <v-main style="background-color: #000000">
                <router-view />
            </v-main>
            <Footer v-if="!$vuetify.breakpoint.mobile" />
            <MobileMenu v-if="$vuetify.breakpoint.mobile && $route.path != '/page_game_play'" />
            <Overlay v-model="gameProxy.loading" />
        </div>
        <DialogMessage />
        <!-- 不是竖屏时提醒 -->
        <Orientation v-if="!isScreenV && $route.path != '/page_game_play'" />
        <!-- dialog的挂载点 -->
        <div id="dialog_container"></div>
        <!-- 用户面板 -->
        <v-navigation-drawer v-model="headerProxy.pageData.bShowUserPanel" app temporary width="288" color="#000000">
            <UserPanel />
        </v-navigation-drawer>
        <!-- 客服 -->
        <v-btn
            height="110"
            color="colorPanelTitleBg"
            class="customer rounded-t-pill rounded-b-pill info--text text-h6"
            @click="onService"
            v-if="!$vuetify.breakpoint.mobile"
        >
            <div class="d-flex flex-column">
                <v-img src="@/_skin003/assets/kefu.png" max-width="50"></v-img>
                <!-- <v-icon class="mr-1">mdi-message-text-outline</v-icon> -->
                <div class="mt-2">{{ LangUtil("客服") }}</div>
            </div>
        </v-btn>
        <!-- 添加到桌面引导 -->
        <div class="btn-guide" v-if="$vuetify.breakpoint.mobile && isShowGuide && $route.path == '/'">
            <v-btn color="colorTitleBg" class="colorTextGold--text" @click="onGuide()">{{ guideText }}</v-btn>
        </div>
        <v-navigation-drawer v-if="guideDrawer" v-model="guideDrawer" color="colorTitleBg" height="290" bottom temporary fixed>
            <div class="colorTextGold--text text-14 pt-5">
                <div class="d-flex justify-center mb-3">
                    {{ LangUtil("点击下方工具栏的") }}
                    <v-img class="ml-2" src="@/assets/guide/img01.png" max-width="25"></v-img>
                </div>
                <div class="d-flex justify-center mb-3">
                    {{ LangUtil("并选择") }}
                    <v-img class="mx-2" src="@/assets/guide/img02.png" max-width="25"></v-img>
                    “{{ LangUtil("添加到主屏幕") }}”
                </div>
                <div class="d-flex justify-center mb-3">
                    <v-img class="ml-2" src="@/assets/guide/img03.png" max-width="200" max-height="150"></v-img>
                </div>
                <div class="d-flex justify-center">
                    <v-icon color="colorTextGold">mdi-arrow-down-bold</v-icon>
                </div>
            </div>
        </v-navigation-drawer>
        <!-- 游戏搜索 -->
        <GameSearch />
    </v-app>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Header from "./views/header/views/Header.vue";
import Footer from "@/_skin003/views/footer/Footer.vue";
import MobileMenu from "@/_skin003/views/mobile_menu/MobileMenu.vue";
import DialogMessage from "@/views/dialog_message/views/DialogMessage.vue";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import Orientation from "@/views/widget/orientation/Orientation.vue";
import UserPanel from "@/_skin003/views/header/widget/user_panel/UserPanel.vue";
import APP from "./App";
import GameSearch from "@/views/game_search/views/GameSearch.vue";

@Component({
    components: {
        DialogMessage,
        Header,
        Footer,
        MobileMenu,
        Overlay,
        Orientation,
        UserPanel,
        GameSearch,
    },
})
export default class extends APP {}
</script>

<style lang="scss" scoped>
.customer {
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
