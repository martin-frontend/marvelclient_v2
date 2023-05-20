<template>
    <v-app>
        <div id="page">
            <HeaderMobile v-if="$vuetify.breakpoint.mobile && isShowHeader" />
            <Header v-if="!$vuetify.breakpoint.mobile && isShowHeader" />
            <v-main
                id="mainpage"
                class="background"
                :class="{
                    'mobile-soccer': $vuetify.breakpoint.mobile && $route.path == '/page_game_soccer',
                    'mobile-background': $vuetify.breakpoint.mobile,
                }"
            >
                <router-view />
            </v-main>
            <Footer class="footer" v-if="$route.path != '/page_game_soccer'" />
            <MobileMenu v-if="$vuetify.breakpoint.mobile && $route.path != '/page_game_play'" />
            <Overlay v-model="gameProxy.loading" />
        </div>
        <DialogMessage />
        <!-- 不是竖屏时提醒 -->
        <Orientation v-if="!isScreenV && $route.path != '/page_game_play'" />
        <!-- dialog的挂载点 -->
        <div id="dialog_container"></div>
        <!-- 用户面板 -->
        <template v-if="!$vuetify.breakpoint.mobile">
            <v-navigation-drawer v-model="headerProxy.pageData.bShowUserPanel" app right temporary width="288" color="#16233B">
                <UserPanel />
            </v-navigation-drawer>
        </template>
        <template v-else>
            <v-navigation-drawer v-model="headerProxy.pageData.bShowUserPanel" app left temporary width="288" color="colorUserPanelBg1">
                <UserPanel />
            </v-navigation-drawer>
        </template>
        <!-- 客服 -->
        <!-- <v-btn height="42" color="#ffb01b"
            class="customer rounded-xl black--text font-weight-bold d-flex align-center text-h6" @click="onService"
            v-if="!$vuetify.breakpoint.mobile">
            <v-icon class="mr-1">mdi-message-text-outline</v-icon>
            <span class="mb-1">{{ LangUtil("客服") }}</span>
        </v-btn> -->
        <v-sheet v-if="!$vuetify.breakpoint.mobile" class="customer d-flex flex-column" color="colorPanelTitleBg" elevation="0">
            <v-btn min-height="110" color="transparent" class="info--text" @click="onNoticeShow" elevation="0">
                <div class="d-flex flex-column align-center mt-2">
                    <v-img class=" " src="@/_skin004/assets/notice.png" max-width="40"></v-img>
                    <!-- <v-icon class="mr-1">mdi-message-text-outline</v-icon> -->
                    <div class="mt-2 item text-12">{{ LangUtil("公告") }}</div>
                </div>
            </v-btn>
            <div class="ml-2 mr-2 hackhome"></div>
            <v-btn min-height="110" color="transparent" class="info--text" @click="onService" elevation="0">
                <div class="d-flex flex-column align-center mt-2">
                    <v-img src="@/_skin004/assets/kefu.png" max-width="40"></v-img>
                    <!-- <v-icon class="mr-1">mdi-message-text-outline</v-icon> -->
                    <div class="mt-2 item text-12">{{ LangUtil("客服") }}</div>
                </div>
            </v-btn>
        </v-sheet>
        <!-- 添加到桌面引导 -->
        <div class="btn-guide" v-if="false && $vuetify.breakpoint.mobile && isShowGuide && $route.path == '/'">
            <v-btn color="colorTitleBg" class="colorTextGold--text" @click="onGuide()">{{ myProxy.guideText }}</v-btn>
        </div>
        <v-navigation-drawer
            v-if="myProxy.guideDrawer"
            v-model="myProxy.guideDrawer"
            color="colorTitleBg"
            height="290"
            bottom
            temporary
            fixed
        >
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
                    <v-img class="ml-2" :src="guideImg" max-width="200" max-height="150"></v-img>
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
import Header from "@/_skin004/views/header/views/Header.vue";
import Footer from "@/_skin004/views/footer/Footer.vue";
import MobileMenu from "@/_skin004/views/mobile_menu/MobileMenu.vue";
import DialogMessage from "@/views/dialog_message/views/DialogMessage.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Orientation from "@/views/widget/orientation/Orientation.vue";
import UserPanel from "@/_skin004/views/header/widget/user_panel/UserPanel.vue";
import APP from "@/_skin004/App";
import GameSearch from "@/views/game_search/views/GameSearch.vue";
import HeaderMobile from "@/_skin004/views/header_mobile/views/HeaderMobile.vue";

@Component({
    components: {
        DialogMessage,
        Header,
        HeaderMobile,
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
    z-index: 100;
    position: fixed;
    right: 55px;
    bottom: 60px;
    z-index: 100;
    border-radius: 50pt;
    .item {
        width: 60px;
        position: relative;
        white-space: normal;
        word-break: break-all;
    }
}

.btn-guide {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 90px;
}

.mobile-soccer {
    padding: 0px !important;
}

.background {
    background-color: #131e36;
}

.mobile-background {
    background-color: #f7f7f7;
}

.footer {
    padding-bottom: 55px;
}
.hackhome {
    height: 1px;
    //background-image: linear-gradient(to right, #213354 0%, #213354 50%, transparent 50%);
    background-image: linear-gradient(to right, #858ca6 0%, #858ca6 100%);
    background-size: 16px 1px;
    background-repeat: repeat-x;
}
</style>
