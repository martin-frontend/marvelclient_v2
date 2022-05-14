<template>
    <v-sheet class="text-16" max-width="956" height="350" color="transparent">
        <v-img
            position="right bottom"
            contain
            max-width="956"
            height="350"
            src="https://hx1web.hstax1tic.com/static/media/CAT@3x.a57017f7.png"
        >
            <div class="text-26 font-weight-bold mb-3" style="margin-top: 74px">J9BC介绍</div>
            <v-sheet width="640" color="transparent">
                <p class="text-info">J9BC是J9国际（J9.io）基于BSC币安智能链发行的一种数字货币，有去中心化、交易匿名、安全等特性。</p>
                <p class="text-info">
                    J9BC独创下注挖矿解决方案——用户的每笔投注都会产出一定数量的J9BC，并且所有持有J9BC的玩家都可以从分红池中获得一定比例的网站利润分成。
                </p>
            </v-sheet>
        </v-img>
    </v-sheet>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
@Component
export default class Infomation extends AbstractView {}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
.text-info {
    color: rgba(255, 255, 255, 0.8);
    line-height: 32px;
}
</style>
