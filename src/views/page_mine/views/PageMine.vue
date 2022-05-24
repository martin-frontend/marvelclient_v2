<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" lg="5">
                <v-card width="100%" color="colorTitleBg" class="rounded-xl pa-4 pa-md-8">
                    <span class="colorTextBlueLight--text text-h6 text-md-h5 font-weight-light pl-3">挖矿等级</span>
                    <v-row no-gutters class="mt-3 mt-md-6">
                        <v-col cols="2">
                            <v-img src="~@/assets/mine/vip_icon.png"></v-img>
                        </v-col>
                        <v-col cols="10" class="pl-2 d-flex flex-column align-start justify-center text-body-2 text-md-body-1">
                            <v-sheet width="100%" class="text-h6 text-md-h5 mb-1 d-flex align-center" color="transparent">
                                VIP1
                                <span class="text-body-2 text-md-body-1 ml-2 colorTextBlueLight--text text-decoration-underline"
                                    >查看所有等级</span
                                >
                            </v-sheet>
                            <v-sheet width="100%" color="transparent">
                                <v-progress-linear value="60" color="orange" height="10" class="rounded-xl"></v-progress-linear>
                                <p class="colorTextBlue--text ma-0 mt-1">
                                    距离下一个等级还差<span class="colorCoin--text">1000</span> 有效流水,USDT充值<span
                                        class="colorCoin--text"
                                        >1000</span
                                    >
                                </p>
                            </v-sheet>
                        </v-col>
                        <v-col class="d-flex mt-6 mt-md-16 down_box">
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <v-sheet color="colorBorderBlue" outlined class="rounded-lg px-4 py-2">
                                        <div class="d-flex">
                                            <v-img max-width="30" height="30" contain src="~@/assets/mine/usdt_icon.png"></v-img>
                                            <span class="colorTextBlueLight--text text-body-2 text-md-body-1 ml-2">USDT返水</span>
                                        </div>
                                        <div class="d-flex align-center justify-space-between mt-3">
                                            <span class="colorTextGreen--text text-h6 text-md-h5">0.6%</span>
                                            <v-img max-width="55" height="22" contain src="~@/assets/mine/arrow_icon.png"></v-img>
                                            <span class="colorTextBlue--text text-h6 text-md-h5">0.6%</span>
                                        </div>
                                    </v-sheet>
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <v-sheet color="colorBorderBlue" outlined class="rounded-lg px-4 py-2">
                                        <div class="d-flex">
                                            <v-img max-width="30" height="30" contain src="~@/assets/mine/lcc_icon.png"></v-img>
                                            <span class="colorTextBlueLight--text text-body-2 text-md-body-1 ml-2">LCC挖矿</span>
                                        </div>
                                        <div class="d-flex align-center justify-space-between mt-3">
                                            <span class="colorTextGreen--text text-h6 text-md-h5">0.6%</span>
                                            <v-img max-width="55" height="22" contain src="~@/assets/mine/arrow_icon.png"></v-img>
                                            <span class="colorTextBlue--text text-h6 text-md-h5">0.6%</span>
                                        </div>
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="7" class="d-flex">
                <v-card class="right_banner px-4 px-md-8 pt-8 rounded-xl" width="100%">
                    <v-card-text class="pa-0">
                        <v-row no-gutters>
                            <v-col cols="12" md="4">
                                <span class="colorTextPurple--text text-h6 text-md-h5 font-weight-light pl-3">游戏挖矿</span>
                                <v-img class="cat_icon" max-width="245" height="237" contain src="~@/assets/mine/cat_icon.png"></v-img>
                            </v-col>
                            <v-col cols="12" md="8" class="text-body-2 text-md-body-1 mt-6">
                                <div class="font-weight-light">
                                    <p class="ma-0">今日挖矿待领取收益</p>
                                    <p class="ma-0 colorTextPurple--text">2001-10-10 00:00:00～23:59:59</p>
                                </div>
                                <div class="d-flex align-center mt-5 mt-md-10 mb-6 elevation='2'">
                                    <v-img max-width="42" height="42" contain src="~@/assets/mine/usdt_big_icon.png"></v-img>
                                    <span class="colorTextGold--text text-h5 text-md-h4 ml-3 mr-7">0.00</span>
                                    <v-img max-width="42" height="42" contain src="~@/assets/mine/lcc_icon.png"></v-img>
                                    <span class="colorTextGold--text text-h5 text-md-h4 ml-3">0.00</span>
                                </div>
                                <v-btn width="178" height="42" color="colorCoin" class="rounded-pill">领取奖励</v-btn>
                                <div class="d-flex justify-md-end btn_group mt-10 mb-4">
                                    <v-btn color="colorExtensionBtn" class="rounded-pill">说明</v-btn>
                                    <v-btn color="colorExtensionBtn" class="rounded-pill mx-2" @click="handlerMineRecord">奖励记录</v-btn>
                                    <v-btn color="colorExtensionBtn" class="rounded-pill">投注记录</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- vip 等级 -->
        <v-sheet color="transparent" class="mt-8">
            <span class="text-h6 text-md-h5 font-weight-light">VIP等级</span>
            <p class="ma-0 text-caption text-md-body-2 colorText3--text">
                个人投注额和好友投注额增加时会提高洗码等级，业绩与洗码等级的关系如下图所示，最高级可达0.9%洗码。
            </p>

            <v-slide-group>
                <v-slide-item v-for="n in 15" :key="n">
                    <v-card color="transparent" height="260" width="180">
                        <v-img max-width="100%" height="100%" class="mx-2" src="~@/assets/mine/item_bg.png">
                            <div class="d-flex flex-column align-center mt-16 text-body-1">
                                <div class="mt-8 mb-1">初入赌场</div>
                                <div class="mb-1 colorText3--text">USDT返水</div>
                                <div class="mb-1 colorCoin--text text-h5">0.3%</div>
                                <div class="mb-1">LCC挖矿</div>
                                <div class="colorCoin--text text-h5">3%</div>
                            </div>
                        </v-img>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
        <!-- 如何挖矿 -->
        <v-sheet color="transparent" class="mt-8">
            <span class="text-h6 text-md-h5 font-weight-light">如何挖矿</span>
            <p class="ma-0 text-caption text-md-body-2 colorText3--text">
                您的有效投注额及被推荐好友投注都会产生收益，投注越多个人洗码越高，好友越多洗码收益越丰厚。
            </p>
            <v-row class="mt-2">
                <v-col cols="12" md="4">
                    <v-card width="100%" color="colorPanelBg2" class="rounded-xl pa-4 pa-md-8">
                        <v-card-title class="pa-0">
                            <v-img max-width="78" class="mr-4" height="78" contain src="~@/assets/mine/about_01_icon.png"></v-img>
                            <div class="d-flex flex-column">
                                <span class="text-h5 colorCoin--text mb-2">01</span>
                                <span class="text-body-1">享受游戏之旅</span>
                            </div>
                        </v-card-title>
                        <v-card-text class="px-0 mt-4">
                            <span class="text-caption text-md-body-2"
                                >参与你最喜欢的游戏，并不断累计有效投注额，推荐的好友以及他的好友产生的投注额都会增加你的洗码等级。</span
                            >
                        </v-card-text>
                        <v-card-actions class="pa-0">
                            <v-btn width="126" height="42" color="colorBlue2Bg" class="rounded-pill">去投注</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card width="100%" color="colorPanelBg2" class="rounded-xl pa-4 pa-md-8">
                        <v-card-title class="pa-0">
                            <v-img max-width="78" class="mr-4" height="78" contain src="~@/assets/mine/about_02_icon.png"></v-img>
                            <div class="d-flex flex-column">
                                <span class="text-h5 colorCoin--text mb-2">02</span>
                                <span class="text-body-1">领取个人洗码</span>
                            </div>
                        </v-card-title>
                        <v-card-text class="px-0 mt-4">
                            <span class="text-caption text-md-body-2"
                                >个人有效投注额乘以洗码比例，即为个人洗码，该收益将自动发放到洗码页面，可随时领取到USDT钱包。</span
                            >
                        </v-card-text>
                        <v-card-actions class="pa-0">
                            <v-btn width="126" height="42" color="colorBlue2Bg" class="rounded-pill">去领取</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card width="100%" color="colorPanelBg2" class="rounded-xl pa-4 pa-md-8" height="100%">
                        <v-card-title class="pa-0">
                            <v-img max-width="78" class="mr-4" height="78" contain src="~@/assets/mine/about_03_icon.png"></v-img>
                            <div class="d-flex flex-column">
                                <span class="text-h5 colorCoin--text mb-2">03</span>
                                <span class="text-body-1">自动结算推荐洗码</span>
                            </div>
                        </v-card-title>
                        <v-card-text class="px-0 mt-4">
                            <span class="text-caption text-md-body-2"
                                >当你的洗码比例高于好友，每周可以获得好友投注额 x
                                比例差值的自动洗码，这意味着最高可拿到0.3%推荐洗码（0.9-0.6）。</span
                            >
                        </v-card-text>
                        <v-card-actions> </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>
<style src="./PageMine.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageMine from "./PageMine";
import Overlay from "@/views/widget/overlay/Overlay.vue";

@Component({
    components: {
        Overlay,
    },
})
export default class extends PageMine {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
