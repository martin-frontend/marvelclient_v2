<template src="./DialogPromotionStatistics.vue.html" lang="html"></template>
<style src="./DialogPromotionStatistics.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPromotionStatistics from "./DialogPromotionStatistics";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogPromotionStatistics {}
</script>
