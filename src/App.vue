<template>
    <v-app>
        <div id="page">
            <Header v-show="!($vuetify.breakpoint.mobile && $route.path == '/page_game_play')" />
            <v-main>
                <router-view />
            </v-main>
            <Footer v-if="!$vuetify.breakpoint.mobile" />
            <MobileMenu v-if="$vuetify.breakpoint.mobile && $route.path != '/page_game_play'" />
            <Overlay v-model="gameProxy.loading" />
        </div>
        <DialogMessage />
        <!-- 不是竖屏时提醒 -->
        <Orientation v-if="isMobile() && !isScreenV && $route.path != '/page_game_play'" />
        <!-- dialog的挂载点 -->
        <div id="dialog_container"></div>
        <!-- 用户面板 -->
        <v-navigation-drawer v-model="headerProxy.pageData.bShowUserPanel" app temporary width="288" color="#16233B">
            <UserPanel />
        </v-navigation-drawer>
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
        <!-- 添加到桌面引导 -->
        <div class="btn-guide" v-if="$vuetify.breakpoint.mobile && isShowGuide && $route.path == '/'">
            <v-btn color="colorTitleBg" class="colorTextGold--text" @click="onGuide">{{ guideText }}</v-btn>
        </div>
        <v-navigation-drawer v-model="guideDrawer" color="colorTitleBg" height="290" bottom temporary app>
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
import OpenLink from "./core/global/OpenLink";
import Orientation from "@/views/widget/orientation/Orientation.vue";
import HeaderProxy from "./views/header/proxy/HeaderProxy";
import UserPanel from "./views/header/widget/user_panel/UserPanel.vue";
import { isMobile } from "./core/global/Functions";

@Component({
    components: {
        DialogMessage,
        Header,
        Footer,
        MobileMenu,
        Overlay,
        Orientation,
        UserPanel,
    },
})
export default class APP extends Vue {
    gameProxy: GameProxy = getProxy(GameProxy);
    headerProxy: HeaderProxy = getProxy(HeaderProxy);
    LangUtil = LangUtil;
    isMobile = isMobile;
    //是否显示IOS引导
    guideDrawer = false;
    isScreenV = !window.orientation || window.orientation == 180 || window.orientation == 0;

    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.isScreenV = !window.orientation || window.orientation == 180 || window.orientation == 0;
    }

    @Watch("headerProxy.pageData.bShowUserPanel")
    onWatchUserPanelShow(){
        if(this.headerProxy.pageData.bShowUserPanel){
            document.documentElement.style.overflow = "hidden";
            //@ts-ignore
            document.body.scroll = "no";
        }
        else{
            document.documentElement.style.overflow = "scroll";
            //@ts-ignore
            document.body.scroll = "yes";
        }
    }

    get guideText() {
        //@ts-ignore
        return LangUtil(window.navigator.standalone === undefined ? "下载APP" : "添加到桌面");
    }

    get isShowGuide() {
        //@ts-ignore
        if (window.navigator.standalone === true) {
            return false;
        }
        return true;
    }

    onGuide() {
        //@ts-ignore
        if (window.navigator.standalone === false) {
            this.guideDrawer = true;
        } else {
            //下载apk
        }
    }

    onService() {
        OpenLink(LangUtil("客服链接"));
    }
}
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
