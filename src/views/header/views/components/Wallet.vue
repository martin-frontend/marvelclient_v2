<template>
    <div>
        <v-menu offset-y nudge-bottom="20">
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                    <v-sheet
                        class="d-none d-md-flex align-center rounded-pill pr-8"
                        color="rgba(255, 255, 255, 0.08)"
                        width="258"
                        height="46"
                        v-if="myProxy.gold_info[myProxy.selectKey]"
                    >
                        <v-img class="ml-2" :src="coinIcon[myProxy.selectKey]" max-width="20" max-height="20"></v-img>
                        <span class="text-16 ml-2">${{ myProxy.gold_info[myProxy.selectKey].sum_money }}</span>
                        <v-spacer />
                        <div class="icon-box iconfont arrow mr-16 text-10" style="transform: rotate(90deg)"></div>
                    </v-sheet>
                    <v-sheet
                        color="rgba(255, 255, 255, 0.08)"
                        class="d-flex d-md-none align-center rounded-pill pr-8"
                        width="186"
                        height="32"
                        v-if="myProxy.gold_info[myProxy.selectKey]"
                    >
                        <v-img class="ml-2" :src="coinIcon[myProxy.selectKey]" max-width="20" max-height="20"></v-img>
                        <span class="text-16 ml-2">${{ myProxy.gold_info[myProxy.selectKey].sum_money }}</span>
                        <v-spacer />
                        <div class="icon-box iconfont arrow mr-7 text-10" style="transform: rotate(90deg)"></div>
                    </v-sheet>
                </div>
            </template>
            <div class="listbox">
                <div
                    class="d-flex align-center lisitem"
                    :class="myProxy.selectKey == key ? 'listitem-active' : ''"
                    v-for="(item, key) of myProxy.gold_info"
                    :key="key"
                    @click="onItemClick(key)"
                >
                    <v-img :src="coinIcon[key]" max-width="48" max-height="48"></v-img>
                    <div class="ml-3" style="color: rgba(255, 255, 255, 0.8)">
                        <div class="text-16 font-weight-bold">{{ key }}钱包</div>
                        <div>${{ item.sum_money }}</div>
                    </div>
                </div>
            </div>
        </v-menu>

        <v-btn class="btn-topup d-none d-md-flex rounded-pill black--text mr-3" height="38" color="#ffb01b">
            <div class="mx-1 text-16">充值</div>
        </v-btn>
        <v-btn class="btn-topup-min d-flex d-md-none rounded-pill black--text mr-3" height="24" max-width="48" x-small color="#ffb01b">
            <div class="mx-1 text-12">充值</div>
        </v-btn>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import WalletProxy from "../../proxy/WalletProxy";
@Component
export default class Wallet extends AbstractView {
    private myProxy: WalletProxy = this.getProxy(WalletProxy);
    private coinIcon = this.myProxy.coinIcon;

    private onItemClick(key: string) {
        this.myProxy.selectKey = key;
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
@import "@/style/params.scss";
::v-deep.v-menu__content {
    border-radius: 10px !important;
    width: 177px !important;
    min-width: 0 !important;
}
.btn-topup {
    position: absolute;
    margin-top: -41px;
    margin-left: 175px;
}
.btn-topup-min {
    position: absolute;
    margin-top: -28px;
    margin-left: 130px;
}
.listbox {
    background-color: #324466;
}
.lisitem {
    cursor: pointer;
    width: 177px;
    height: 82px;
    padding-left: 15px;
    margin-top: 1px;
}
.listitem-active {
    background-color: #25324b;
}
.lisitem:hover {
    background-color: #25324b;
}
</style>
