<template>
    <v-app class="d-flex app" :class="$mobile ? '' : 'app_min_width'">
        <!-- pc版的显示 -->
        <template v-if="!$mobile">
            <v-sheet id="page" class="d-flex" color="transparent">
                <Navigation />

                <v-sheet id="mainpage" color="transparent" class="d-flex justify-center mainpage">
                    <Header id="pc_header" class="head_test" />
                    <!-- <v-sheet color="transparent" class="px-2" width="100%"> -->
                    <v-main id="router_page" class="router_test">
                        <router-view />
                        <Footer v-if="isShowFooter" />
                    </v-main>
                    <!-- </v-sheet> -->
                </v-sheet>
            </v-sheet>
        </template>
        <!-- 手机版 -->
        <template v-else>
            <div id="page">
                <Header v-if="isShowHeader" />
                <v-main id="mainpage" color="transparent" class="overflow-hidden">
                    <div id="router_page" class="overflow-hidden">
                        <router-view />
                        <Footer v-if="isShowFooter" />
                    </div>
                </v-main>
                <MobileMenu v-if="!$route.path.includes('page_game_play')" />
            </div>
        </template>
        <!-- 用户面板 -->
        <template v-if="$mobile">
            <v-navigation-drawer
                v-model="myProxy.bshowNavigationPanel"
                left
                temporary
                width="240"
                app
                class="mob_navigation"
                color="bgBanner"
            >
                <Navigation />
            </v-navigation-drawer>

            <!-- <v-navigation-drawer v-model="myProxy.bshowUserPanel" app left temporary width="288"
                color="bgBanner">
                <UserPanel />
            </v-navigation-drawer> -->
        </template>

        <DialogMessage />
        <DialogMessageBox />

        <Overlay v-model="myProxy.loading" />
        <!-- <UserPanel /> -->
        <!-- dialog的挂载点 -->
        <div id="dialog_container"></div>
        <!-- <Orientation v-if="!isScreenV && !Constant.isIncludeGameRouter($route.path)"/> -->
        <template v-if="!$mobile">
            <v-btn
                v-if="showSpinLottery"
                class="btn-activity-spin"
                :class="{ 'show-partner': ModulesHelper.isShow_PartnerKefu() }"
                id="activitySpinBtn"
                icon
                @click="onClickBtnSpin"
            >
                <v-img src="~@/_skin030/assets/activity_spin/spin_icon.png" width="62"></v-img>
            </v-btn>

            <v-btn class="btn-top" id="apptopbtn" v-if="isShowTopBtn" icon @click="onTop">
                <btn-yellow class="text-30 pt-0" min_width="0" width="50" height="50">
                    <svg-icon icon="arrow_top" class="text-14"></svg-icon>
                    <div class="text-14 font-weight-bold mb-2">{{ LangUtil("Top") }}</div>
                </btn-yellow>
            </v-btn>

            <v-btn v-if="ModulesHelper.isShow_Kefu()" class="btn-service" icon @click="onService">
                <btn-yellow class="text-24" min_width="0" width="50" height="50">
                    <svg-icon icon="service"></svg-icon>
                </btn-yellow>
            </v-btn>
            <!-- partner -->
            <v-btn v-if="ModulesHelper.isShow_PartnerKefu()" class="btn-partner-service pc" icon @click="onPartnerService">
                <btn-yellow class="text-24" min_width="0" width="50" height="50">
                    <svg-icon icon="partner"></svg-icon>
                </btn-yellow>
            </v-btn>
        </template>
        <template v-if="$xsOnly">
            <v-btn
                v-if="showSpinLottery"
                class="btn-activity-spin spin_mob"
                :class="{ 'show-partner': ModulesHelper.isShow_PartnerKefu() }"
                id="activitySpinBtn"
                icon
                @click="onClickBtnSpin"
            >
                <v-img src="~@/_skin030/assets/activity_spin/spin_icon.png" width="54"></v-img>
            </v-btn>
            <v-btn
                v-if="ModulesHelper.isShow_Kefu() && !SkinVariable.systemKefuTop && isShowFooter"
                class="btn-service"
                icon
                @click="onService"
            >
                <btn-yellow class="text-20" min_width="0" width="40" height="40">
                    <svg-icon icon="service"></svg-icon>
                </btn-yellow>
            </v-btn>
            <!-- partner -->
            <v-btn v-if="ModulesHelper.isShow_PartnerKefu() && isShowFooter" class="btn-partner-service" icon @click="onPartnerService">
                <btn-yellow class="text-20" min_width="0" width="40" height="40">
                    <svg-icon icon="partner"></svg-icon>
                </btn-yellow>
            </v-btn>
        </template>
        <div
            v-if="PageBlur.isBlur && !isSafari()"
            class="blur-mask"
            :class="{
                'blur-mask-bottom': PageBlur.bottom && !$mobile,
                'blur-mask-bottom_mob': PageBlur.bottom && $mobile,
                'blur-mask-right': PageBlur.right,
            }"
        ></div>

        <!-- 添加到桌面引导 -->
        <v-sheet
            class="btn-guide d-flex justify-center"
            color="transparent"
            width="100%"
            v-if="isShowGuide && SkinVariable.isNeedDownloadBtn"
        >
            <btn-yellow class="text-14 download_btn" height="36" min_width="90" :btn_type="9" @click.native.stop="onGuide">{{
                myProxy.guideText
            }}</btn-yellow>
        </v-sheet>
        <v-navigation-drawer
            v-if="myProxy.guideDrawer"
            v-model="myProxy.guideDrawer"
            color="transparent"
            height="432"
            bottom
            temporary
            fixed
        >
            <GuideDrawer @onClose="onCloseGuide" />
        </v-navigation-drawer>

        <CoinTip />
    </v-app>
</template>

<script lang="ts">
import Component from "vue-class-component";
import App from "./App";
import UserPanel from "./views/header/user_panel/UserPanel.vue";
import DialogMessage from "./views/dialog_message/views/DialogMessage.vue";

import MobileMenu from "./views/mobile_menu/MobileMenu.vue";
import Navigation from "./views/navigation/Navigation.vue";
import Orientation from "@/_skin030/views/widget/orientation/Orientation.vue";
import GuideDrawer from "@/_skin030/views/widget/guide_drawer/GuideDrawer.vue";
import DialogMessageBox from "@/_skin030/views/dialog_message_box/views/DialogMessageBox.vue";
import LangUtil from "@/core/global/LangUtil";
import CoinTip from "@/_skin030/views/widget/wallet/coin_tip/CoinTip.vue";

@Component({
    components: {
        Navigation,
        MobileMenu,
        UserPanel,
        DialogMessage,
        Orientation,
        GuideDrawer,
        DialogMessageBox,
        CoinTip,
    },
})
export default class extends App {
    LangUtil = LangUtil;
}
</script>

<style lang="scss" scoped>
.app {
    background-color: transparent;
    margin-left: auto;
    margin-right: auto;
    max-width: 2560px;
}
.app_min_width {
    min-width: 1200px;
}
.btn-guide {
    //width: 100%;
    //text-align: center;
    position: fixed;
    bottom: 70px;
    pointer-events: none;
    //left: calc(50% - 45px);
}
.download_btn {
    pointer-events: auto;
}
.main-pc {
    padding-left: 94px;
}
.mob_navigation {
    z-index: 12 !important;
}
.btn-service {
    position: fixed;
    bottom: 85px;
    right: 25px;
    z-index: 7;
}
.btn-partner-service {
    position: fixed;
    bottom: 133px;
    right: 25px;
    z-index: 7;
    &.pc {
        bottom: 140px;
    }
}

.btn-top {
    position: fixed;
    bottom: 30px;
    right: 25px;
    z-index: 7;
}

.btn-activity-spin {
    position: fixed;
    bottom: 143px;
    right: 25px;
    z-index: 7;
}

.btn-activity-spin.spin_mob.show-partner {
    bottom: 183px;
}
.btn-activity-spin.spin_mob.show-dailytask {
    bottom: 183px;
}
.btn-activity-spin.spin_mob.show-partner.show-dailytask {
    bottom: 227px;
}

.btn-activity-spin.show-partner {
    bottom: 195px;
}

.btn-activity-spin.show-dailytask {
    bottom: 195px;
}

.btn-activity-spin.show-partner.show-dailytask {
    bottom: 242px;
}

//以下都是在代码中调用的样式 Navigation.ts
.mainpage {
    width: calc(100% - 188px);
}

.mainpage_mini {
    width: calc(100% - 60px);
}

.head_test {
    position: fixed;
    top: 0;
    z-index: 10;
    //width: calc(100% - 188px) !important;
    //max-width: 2360px;
    //min-width: 1000px;
}

.head_test_mini {
    position: fixed;
    top: 0;
    z-index: 10;
    //width: calc(100% - 60px) !important;
    //max-width: 2500px;
    //min-width: 1140px;
}

.router_test {
    position: relative;
    top: 60px;
}

.blur-mask {
    pointer-events: none;
    position: fixed;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    backdrop-filter: blur(5px);
    z-index: 11;
}

.blur-mask-right {
    z-index: 9 !important;
}

.blur-mask-bottom {
    z-index: 11;
    top: 74px;
}
.blur-mask-bottom_mob {
    z-index: 11;
    top: 50px;
}
</style>
