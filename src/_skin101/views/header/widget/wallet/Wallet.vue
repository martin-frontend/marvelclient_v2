<template src="./Wallet.vue.html" lang="html"></template>
<style src="./Wallet.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Wallet from "./Wallet";
import CoinTip from "./coin_tip/CoinTip.vue";
@Component({
    components: {
        CoinTip,
    },
})
export default class extends Wallet {}
</script>
