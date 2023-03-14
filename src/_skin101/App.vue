<template>
    <v-app>
        <div class="star-container" v-if="!$vuetify.breakpoint.xsOnly">
            <div class="moon"></div>
            <!-- <div class="change"></div> -->
            <div class="meteor" style="left: 853.333px; top: 40px; animation-delay: 0s"></div>
            <div class="meteor" style="left: 1365.33px; top: 40px; animation-delay: 0.0547144s"></div>
            <div class="meteor" style="left: 1877.33px; top: 40px; animation-delay: 3.07335s"></div>
            <div class="meteor" style="left: 2389.33px; top: 40px; animation-delay: 3.66422s"></div>
            <div class="meteor" style="left: 2901.33px; top: 40px; animation-delay: 6.9708s"></div>
        </div>
        <div class="star-container star-container2" v-else>
            <div class=""></div>
            <!-- <div class="change"></div> -->
            <!-- <div class="meteor" style="left: 123.667px; top: 40px; animation-delay: 0s"></div>
            <div class="meteor" style="left: 197.867px; top: 40px; animation-delay: 1.80738s"></div>
            <div class="meteor" style="left: 272.067px; top: 40px; animation-delay: 1.65757s"></div>
            <div class="meteor" style="left: 346.267px; top: 40px; animation-delay: 7.23946s"></div>
            <div class="meteor" style="left: 420.467px; top: 40px; animation-delay: 8.10872s"></div> -->
        </div>
        <!-- <div id="page" style="background-color: #131e36"> -->
        <div id="page" style="background-color: transparent">
            <Header v-show="!($vuetify.breakpoint.mobile && $route.path == '/page_game_play')" />
            <!-- <v-main style="background-color: #131e36"> -->
            <v-main style="background-color: transparent">
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
        <v-navigation-drawer v-model="headerProxy.pageData.bShowUserPanel" app temporary width="288" color="#16233B">
            <UserPanel />
        </v-navigation-drawer>
        <!-- 客服 -->
        <!-- <v-btn
            height="42"
            color="#ffb01b"
            class="customer rounded-xl black--text font-weight-bold d-flex align-center text-h6"
            @click="onService"
            v-if="!$vuetify.breakpoint.mobile"
        > -->
        <!-- <div class="qrcode" v-if="!$vuetify.breakpoint.mobile">
            <div class="download-qr mb-4">
                <div class="img-outer rounded-lg">
                    <v-img max-width="130" max-height="130" :src="qrCode_app"></v-img>
                </div>
                <span class="dl-text">{{ LangUtil("APP") }}</span>
            </div>
        </div> -->
        <div class="right-nav" v-if="!$vuetify.breakpoint.mobile">
            <div class="nav-item service" @click="onService">
                <v-img max-width="30" max-height="30" src="~@/_skin101/assets/img/index/service.png"></v-img>
                <span class="mt6 text-11">{{ LangUtil("联系客服") }}</span>
                <span class="mt-n1 text-11">{{ LangUtil("7x24") }}</span>
            </div>
            <div class="nav-item qr">
                <v-img max-width="30" max-height="30" src="~@/_skin101/assets/img/index/app.png"></v-img>
                <span class="mt6 text-11">{{ LangUtil("下载APP") }}</span>
                <div class="qrcode-side">
                    <div class="qrcode-bg">
                        <v-img max-width="135" max-height="135" :src="qrCode_app"></v-img>
                    </div>
                </div>
            </div>
            <div class="nav-item" @click="onTop">
                <v-img max-width="30" max-height="30" src="~@/_skin101/assets/img/index/top.png"></v-img>
                <span class="mt6 text-11">{{ LangUtil("返回顶部") }}</span>
            </div>
        </div>
        <!-- <v-btn
            width="56"
            height="56"
            text
            class="customer rounded-xl black--text font-weight-bold d-flex align-center text-h6"
            @click="onService"
            v-if="!$vuetify.breakpoint.mobile"
        >
            <v-img max-width="56" max-height="56" src="~@/_skin101/assets/img/service.png"></v-img>
        </v-btn> -->
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
        <!-- <GameSearch /> -->
    </v-app>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Header from "@/_skin101/views/header/views/Header.vue";
import Footer from "@/_skin101/views/footer/Footer.vue";
import MobileMenu from "@/_skin101/views/mobile_menu/MobileMenu.vue";
import DialogMessage from "@/_skin101/views/dialog_message/views/DialogMessage.vue";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import Orientation from "@/views/widget/orientation/Orientation.vue";
import UserPanel from "@/_skin101/views/header/widget/user_panel/UserPanel.vue";
import APP from "./App";
// import GameSearch from "@/views/game_search/views/GameSearch.vue";

@Component({
    components: {
        DialogMessage,
        Header,
        Footer,
        MobileMenu,
        Overlay,
        Orientation,
        UserPanel,
        // GameSearch,
    },
})
export default class extends APP {
    mounted() {
        this.setLink_app();
    }
}
</script>

<style lang="scss" scoped>
.right-nav {
    z-index: 100;
    position: fixed;
    right: 55px;
    bottom: 150px;
    display: flex;
    flex-direction: column;
    .service {
        padding: 10px 0 0 !important;
    }
    .qr:hover {
        .qrcode-side {
            display: flex;
        }
    }
    .nav-item {
        cursor: pointer;
        padding: 10px 0 5px;
        margin-bottom: 22px;
        width: 66px;
        border-radius: 10px;
        border: solid 1px rgba(255, 255, 255, 0.1);
        background-color: rgba(37, 46, 67, 0.46);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &:hover {
            border: solid 1px rgba(255, 255, 255, 0.1);
            background-color: #252e43;
        }
        span {
            color: #95989f;
        }
    }
    .qrcode-side {
        width: 169px;
        height: 160px;
        background-image: url("~@/_skin101/assets/img/index/qrcode_side.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -80px;
        margin-left: -210px;
        display: none;
        align-items: center;
        justify-content: center;
        .qrcode-bg {
            margin-left: -9.5px;
            width: 145px;
            height: 145px;
            background-color: #fff;
            border-radius: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.qrcode {
    z-index: 100;
    position: fixed;
    right: 55px;
    bottom: 150px;
    display: flex;
    flex-direction: column;
    .download-qr {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img-outer {
            width: 140px;
            height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            margin-bottom: 5px;
        }
        .dl-text {
            font-size: 14px;
        }
    }
}
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
    z-index: 2;
    bottom: 90px;
}
.star-container {
    position: fixed;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background: no-repeat top / cover url("~@/_skin101/assets/img/page-bg.png");
    .moon {
        width: 85px;
        height: 85px;
        border-radius: 100%;
        background: url("~@/_skin101/assets/img/moon.png") no-repeat center center;
        background-size: 100%;
        /* background-color: rgb(219, 207, 175); */
        /* box-shadow: 0 0 60px rgb(219 207 175 / 90%); */
        position: fixed;
        -webkit-animation: myMoon 3s linear forwards;
        animation: myMoon 3s linear forwards;
        animation-duration: 3s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
        animation-play-state: running;
        animation-name: myMoon;
        top: 140px;
    }
    .change {
        width: 50px;
        height: 50px;
        border: none;
        position: absolute;
        left: 81.8%;
        top: 169px;
        -webkit-animation: myChange 8s linear;
        animation: myChange 8s linear;
        animation-duration: 8s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
        animation-name: myChange;
    }
    .meteor {
        width: 1px;
        display: block;
        position: absolute;
        // background-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
        background-color: rgba(255, 255, 255, 0.5);
        opacity: 0;
        -webkit-animation: meteor 15s linear infinite;
        animation: meteor 15s linear infinite;
        animation-duration: 15s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
        animation-name: meteor;
        &::after {
            content: "";
            display: block;
            border: 1px solid #fff;
            border-width: 0px 90px 2px 90px;
            border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
    }
}
@keyframes myMoon {
    0% {
        right: 100px;
        top: 80px;
        opacity: 0;
    }
    100% {
        right: 54.8px;
        top: 205px;
        opacity: 1;
    }
}
@keyframes meteor {
    0% {
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translate(-800px, 100vh);
    }
}
.star-container2 {
    background: #0e1a31;
}
// @media screen and (max-width: 750px) {
//     .star-container {
//         // background: #0e1a31;
//         .moon {
//             // background: unset;
//         }
//         .meteor {
//             width: 1px;
//             display: block;
//             position: absolute;
//             background-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
//             opacity: 0;
//             -webkit-animation: meteor 15s linear infinite;
//             animation: meteor 15s linear infinite;
//             animation-duration: 15s;
//             animation-timing-function: linear;
//             animation-delay: 0s;
//             animation-iteration-count: infinite;
//             animation-direction: normal;
//             animation-fill-mode: none;
//             animation-play-state: running;
//             animation-name: meteor;
//             &::after {
//                 content: "";
//                 display: block;
//                 border: 1px solid #fff;
//                 border-width: 0px 90px 2px 90px;
//                 border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
//                 -webkit-transform: rotate(-45deg);
//                 transform: rotate(-45deg);
//             }
//         }
//     }
// }
</style>
