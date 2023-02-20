<template>
    <v-app class="d-flex app">
        <!-- pc版的显示 -->
        <template v-if="!$vuetify.breakpoint.mobile">
            <v-sheet id="page" class="d-flex " color="transparent">
                <Novigation />

                <v-sheet color="transparent" class="d-flex justify-center" width="100%">
                    <Header id="pc_header" class="head_test" />
                    <v-sheet id="mainpage" color="transparent" class="mainpage ">
                        <v-main id="router_page" class="router_test">
                            <router-view />
                            <Footer v-if="!$vuetify.breakpoint.mobile" />
                        </v-main>
                    </v-sheet>
                </v-sheet>
            </v-sheet>
        </template>
        <!-- 手机版 -->
        <template v-else>
            <div id="page">
                <Header v-if="isShowHeader"/>
                <v-main id="mainpage" color="transparent" class="overflow-x-hidden">

                    <div id="router_page" class="overflow-x-hidden">
                        <router-view />
                    </div>
                </v-main>
                <MobileMenu v-if="$route.path != '/page_game_play'"/>
            </div>
        </template>
        <!-- 用户面板 -->
        <template v-if="$vuetify.breakpoint.mobile">
            <v-navigation-drawer v-if="isShowHeader" v-model="myProxy.bshowNovigationPanel" left
                temporary width="188" app color="bgBanner">
                <Novigation />
            </v-navigation-drawer>

            <!-- <v-navigation-drawer v-model="myProxy.bshowUserPanel" app left temporary width="288"
                color="bgBanner">
                <UserPanel />
            </v-navigation-drawer> -->
        </template>

        <DialogMessage />
        <Overlay v-model="myProxy.loading" />
        <!-- <UserPanel /> -->
        <!-- dialog的挂载点 -->
        <div id="dialog_container"></div>
        <Orientation v-if="!isScreenV && $route.path != '/page_game_play'" />
        <template v-if="!$vuetify.breakpoint.mobile">
            <v-btn class="btn-top" id="apptopbtn" v-if="isShowTopBtn" icon @click="onTop">
                <btn-yellow class="text-30 pt-0" min_width="0" width="50" height="50">
                    <svg-icon icon="arrow_top" class="text-14"></svg-icon>
                    <div class="text-14 font-weight-bold mb-2">Top</div>
                </btn-yellow>
            </v-btn>

            <v-btn class="btn-service" icon @click="onService">
                <btn-yellow class="text-24" min_width="0" width="50" height="50">
                    <svg-icon icon="service"></svg-icon>
                </btn-yellow>
            </v-btn>
        </template>
    </v-app>
</template>

<script lang="ts">
import Component from "vue-class-component";
import App from "./App";
import Footer from "./views/footer/Footer.vue";
import Header from "./views/header/Header.vue";
import UserPanel from "./views/header/user_panel/UserPanel.vue";
import DialogMessage from "./views/dialog_message/views/DialogMessage.vue";
import MobileMenu from "./views/mobile_menu/MobileMenu.vue";
import Novigation from "./views/novigation/Novigation.vue";
import Orientation from "@/_skin005/views/widget/orientation/Orientation.vue";
@Component({
    components: {
        Header,
        Footer,
        Novigation,
        MobileMenu,
        UserPanel,
        DialogMessage,
        Orientation,
    },
})
export default class extends App { }
</script>

<style lang="scss" scoped>
.app {
    background-color: transparent;
}

.main-pc {
    padding-left: 94px;
}

.btn-service {
    position: fixed;
    bottom: 20px;
    right: 25px;
    z-index: 100;
}

.btn-top {
    position: fixed;
    bottom: 80px;
    right: 25px;
    z-index: 100;
}


//以下都是在代码中调用的样式 Novigation.ts
.mainpage {
    width: calc(100vw - 218px);
}

.mainpage_mini {
    width: calc(100vw - 85px);
}

.head_test {
    position: fixed;
    top: 0;
    z-index: 10;
    width: calc(100vw - 202px) !important;
}

.head_test_mini {
    position: fixed;
    top: 0;
    z-index: 10;
    width: calc(100vw - 76px) !important;
}

.router_test {
    position: relative;
    top: 65px;
}
</style>
