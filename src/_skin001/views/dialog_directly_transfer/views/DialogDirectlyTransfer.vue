<template src="./DialogDirectlyTransfer.vue.html" lang="html"></template>
<style src="./DialogDirectlyTransfer.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import CoinTip from "@/views/header/widget/wallet/coin_tip/CoinTip";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import DialogDirectlyTransfer from "./DialogDirectlyTransfer";

@Component({
    components: {
        Overlay,
        CustomInput,
        CoinTip,
    },
})
export default class extends DialogDirectlyTransfer {}
</script>
