<template src="./DialogDirectlyTransfer.vue.html" lang="html"></template>
<style src="./DialogDirectlyTransfer.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import CoinTip from "@/_skin005/views/widget/wallet/coin_tip/CoinTip";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import DialogDirectlyTransfer from "./DialogDirectlyTransfer";

@Component({
    components: {
        CustomInput,
        CoinTip,
    },
})
export default class extends DialogDirectlyTransfer {}
</script>
