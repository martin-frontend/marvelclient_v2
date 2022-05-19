<!--
    <template src="./Introduce.vue.html" lang="html"></template>
-->
<template>
    <v-container class="mt-8" :class="$vuetify.breakpoint.mobile ? 'px-3' : ''">
        <!-- 介绍 -->
        <v-row class="d-flex justify-center flex-wrap">
            <v-col cols="12" md="7">
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
                <v-sheet min-width="500" height="330" class="intro-plan rounded-lg">
                    <ul class="textWrap">
                        <li><span class="bg1">70%</span> <strong>游戏挖矿</strong></li>
                        <li><span class="bg2 zh">5%</span> <strong>合作伙伴持有并锁仓两年</strong></li>
                        <li><span class="bg3">10%</span> <strong>空投及社区奖励</strong></li>
                        <li><span class="bg4">5%</span> <strong>好友推荐奖励</strong></li>
                        <li><span class="bg5 zh">10%</span> <strong>创始团队持有并锁仓两年</strong></li>
                        <li></li>
                    </ul>
                </v-sheet>
            </v-col>
            <v-col cols="12" md="3">
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
            </v-col>
        </v-row>
        <!-- 用途 -->
        <v-row>
            <v-col></v-col>
        </v-row>
        <!-- 如何获得 -->
        <v-row></v-row>
        <!-- 产品线路图 -->
        <v-row>
            <v-col>
                <v-btn @click="handleTest">test click</v-btn>
            </v-col>
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
