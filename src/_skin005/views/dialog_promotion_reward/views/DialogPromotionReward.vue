<template src="./DialogPromotionReward.vue.html" lang="html"></template>
<style src="./DialogPromotionReward.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPromotionReward from "./DialogPromotionReward";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogPromotionReward {}
</script>
