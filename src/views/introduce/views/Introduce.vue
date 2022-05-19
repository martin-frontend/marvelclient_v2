<!--
    <template src="./Introduce.vue.html" lang="html"></template>
-->
<template>
    <v-container class="mt-8" :class="$vuetify.breakpoint.mobile ? 'px-3' : ''">
        <!-- 介绍 -->
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="8">
                <v-sheet height="350" color="transparent">
                    <v-row>
                        <v-col>
                            <div class="text-h5 font-weight-bold">J9BC介绍</div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            J9BC是J9国际（J9.io）基于BSC币安智能链发行的一种数字货币，有去中心化、交易匿名、安全等特性。
                        </v-col>
                        <v-col cols="12">
                            J9BC独创下注挖矿解决方案——用户的每笔投注都会产出一定数量的J9BC，并且所有持有J9BC的玩家都可以从分红池中获得一定比例的网站利润分成。
                        </v-col>
                    </v-row>
                </v-sheet>
                <div class="text-h5 font-weight-bold mb-3">产出比例规划</div>
                <v-sheet height="330" class="intro-plan rounded-lg">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-img :src="pageImage.wheel"></v-img>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div><span>70%</span><span>游戏挖矿</span></div>
                            <div><span>5%</span><span>合作伙伴持有并锁仓两年</span></div>
                            <div><span>10%</span><span>空投及社区奖励</span></div>
                            <div><span>5%</span><span>好友推荐奖励</span></div>
                            <div><span>10%</span><span>创始团队持有并锁仓两年</span></div>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
            <v-col cols="12" md="4">
                <div class="text-h5 font-weight-bold mb-3">链上信息</div>
                <v-sheet color="#25324b" class="rounded-lg">
                    <v-row><v-col>Token名称：</v-col> <v-col>J9 CASINO</v-col></v-row>
                    <v-row><v-col>合约地址：</v-col> <v-col>查看合约信息</v-col></v-row>
                    <v-row><v-col>发行链：</v-col> <v-col>Binance Smart Chain (BEP20)</v-col></v-row>
                    <v-row><v-col>总计发行：</v-col> <v-col>10,000,000,000 J9BC</v-col></v-row>
                    <v-row><v-col>总计流通：</v-col> <v-col>163,954,456.076 J9BC</v-col></v-row>
                    <v-row><v-col>总计质押：</v-col> <v-col>124,329,513.594 J9BC</v-col></v-row>
                    <v-row><v-col>持币地址数：</v-col> <v-col>10,803</v-col></v-row>
                </v-sheet>
                <v-sheet class="rounded-lg destroy-bg">
                    <div><span>本周销毁： </span><span>19,400,742.378</span></div>
                    <div><span>总计销毁： </span> <span>39,182,494.67</span></div>
                    <div>玩家质押J9BC所支付的手续费都将转账到黑洞地址，实现J9BC的不断通缩，以支持价格不断上涨。</div>
                    <a href="">链上销毁记录</a>
                </v-sheet>
            </v-col>
        </v-row>
        <!-- 用途 -->
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="12" class="text-h5 font-weight-bold">J9BC的用途</v-col>
        </v-row>
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="4">
                <v-hover v-slot="{ hover }">
                    <v-card :color="hover ? '#283c63' : '#25324b'" rounded="xl">
                        <v-card-title>
                            <v-img contain max-width="24" max-height="24" :src="pageImage.money"></v-img>
                            <span class="ml-2">质押分红</span>
                        </v-card-title>
                        <v-card-text :class="hover ? 'white--text' : 'intro-text'">
                            玩家的J9BC可在网站参与质押，享受网站收益分红，每日零点自动发放，持有J9BC越多分红越多。
                        </v-card-text>
                        <v-layout justify-center>
                            <v-card width="100%" class="ml-4 mr-2 my-2 pa-4" color="rgba(0, 0, 0, 0.2)">
                                <div>当前分红池</div>
                                <div class="text-h5 amber--text font-weight-bold">$263,967</div>
                            </v-card>
                            <v-card width="100%" class="mr-4 ml-2 my-2 pa-4" color="rgba(0, 0, 0, 0.2)">
                                <div>昨日分红</div>
                                <div class="text-h5 amber--text font-weight-bold">$28,520.14</div>
                            </v-card>
                        </v-layout>
                        <v-card-action class="pa-4 d-flex">
                            <v-btn
                                rounded
                                block
                                :class="hover ? 'intro-btn-hover' : 'intro-btn'"
                                color="white"
                                height="48"
                                class="text-body-1"
                            >
                                去质押
                            </v-btn>
                        </v-card-action>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" md="4">
                <v-row class="d-flex flex-column">
                    <v-col cols="12">
                        <v-card color="#25324b" height="142" rounded="xl">
                            <v-card-title>
                                <v-img contain max-width="24" max-height="24" :src="pageImage.coin"></v-img>
                                <span class="ml-2">J9BC投注</span>
                                <v-spacer></v-spacer>
                                <span class="indigo--text font-weight-bold text--lighten-2 text-body-2">敬请期待</span>
                            </v-card-title>
                            <v-card-text>J9BC将会作为网站可用游戏额度，支持多种游戏投注、结算，并支持J9BC作为流通数字货币。</v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="#25324b" height="142" rounded="xl">
                            <v-card-title>
                                <v-img contain max-width="24" max-height="24" :src="pageImage.money"></v-img>
                                <span class="ml-2">J9BC回购</span>
                                <v-spacer></v-spacer>
                                <span class="indigo--text font-weight-bold text--lighten-2 text-body-2">敬请期待</span>
                            </v-card-title>
                            <v-card-text>官方将拿出每日奖池分红的50%用于回购，所有回购的J9BC都将被销毁，实现J9BC的稳步升值。</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="4">
                <v-row class="d-flex flex-column">
                    <v-col cols="12">
                        <v-card color="#25324b" height="142" rounded="xl">
                            <v-card-title>
                                <v-img contain max-width="24" max-height="24" :src="pageImage.coin"></v-img>
                                <span class="ml-2">玩家间交易</span>
                                <v-spacer></v-spacer>
                                <span class="indigo--text font-weight-bold text--lighten-2 text-body-2">敬请期待</span>
                            </v-card-title>
                            <v-card-text>
                                网站即将上线J9BC
                                Swap系统，为玩家间流通提供一个交易平台。玩家间可在网站内直接交易J9BC，网站也会通过Swap进行J9BC回购销毁。
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="#25324b" height="142" rounded="xl">
                            <v-card-title>
                                <v-img contain max-width="24" max-height="24" :src="pageImage.joystick"></v-img>
                                <span class="ml-2">购买特权NFT</span>
                                <v-spacer></v-spacer>
                                <span class="indigo--text font-weight-bold text--lighten-2 text-body-2">敬请期待</span>
                            </v-card-title>
                            <v-card-text>J9.io将会上线特权NFT，玩家可在网站内使用J9BC进行购买或在opensea使用ETH进行购买。</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <!-- 如何获得 -->
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="12" class="text-h5 font-weight-bold">如何获得J9BC</v-col>
        </v-row>
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="4">
                <v-hover v-slot="{ hover }">
                    <v-card :color="hover ? '#283c63' : '#25324b'" height="220" rounded="xl">
                        <v-card-title>
                            <span class="ml-2">游戏投注挖矿</span>
                        </v-card-title>
                        <v-card-text :class="hover ? 'white--text' : 'intro-text'">玩家每笔游戏投注均有收益。盈利可获得对应奖金，且每笔游戏投注额产出5%的J9BC。</v-card-text>
                        <v-card-action class="pa-4 d-flex">
                            <v-btn
                                rounded
                                block
                                :class="hover ? 'intro-btn-hover' : 'intro-btn'"
                                color="white"
                                height="48"
                                class="text-body-1"
                            >
                                去游戏大厅
                            </v-btn>
                        </v-card-action>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" md="4">
                <v-card color="#25324b" height="220" rounded="xl">
                    <v-card-title>
                        <span class="ml-2">定期空投</span>
                    </v-card-title>
                    <v-card-text>加入J9.io官方Telegram社群，关注不定期空投等激励，可获得海量J9BC奖励。</v-card-text>
                    <v-card-action class="pa-4 d-flex">
                        <v-btn rounded color="white" height="48" width="170" class="text-body-1 indigo--text text--darken-2">
                            加入TG社群
                        </v-btn>
                    </v-card-action>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card color="#25324b" height="220" rounded="xl">
                    <v-card-title>
                        <span class="ml-2">好友推荐</span>
                    </v-card-title>
                    <v-card-text>好友推荐增加J9BC奖励，好友游戏挖矿产出J9BC越多获得的奖励越多。</v-card-text>
                    <v-card-action class="pa-4 d-flex">
                        <v-btn disabled rounded color="white" height="48" width="170" class="text-body-1 indigo--text text--darken-2">
                            敬请期待
                        </v-btn>
                    </v-card-action>
                </v-card>
            </v-col>
        </v-row>
        <!-- 产品线路图 -->
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="10" class="text-h5 font-weight-bold">产品线路图</v-col>
        </v-row>
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="3">Q4</v-col>
            <v-col cols="12" md="3">Q1</v-col>
            <v-col cols="12" md="3">Q2</v-col>
            <v-col cols="12" md="3">Q3-Q4</v-col>
        </v-row>
    </v-container>
</template>
<style src="./Introduce.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Introduce from "./Introduce";
import Overlay from "@/views/widget/overlay/Overlay.vue";

@Component({
    components: {
        Overlay,
    },
})
export default class extends Introduce {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
