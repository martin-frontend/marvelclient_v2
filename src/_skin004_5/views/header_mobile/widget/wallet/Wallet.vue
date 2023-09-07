<template src="./Wallet.vue.html" lang="html"></template>
<style src="@/_skin004/views/header/widget/wallet/Wallet.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Wallet from "@/_skin004/views/header/widget/wallet/Wallet";
import CoinTip from "@/_skin004/views/header/widget/wallet/coin_tip/CoinTip.vue";
@Component({
    components: {
        CoinTip,
    },
})
export default class extends Wallet {}
</script>
