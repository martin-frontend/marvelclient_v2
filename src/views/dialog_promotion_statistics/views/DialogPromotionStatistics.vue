<template src="./DialogPromotionStatistics.vue.html" lang="html"></template>
<style src="./DialogPromotionStatistics.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPromotionStatistics from "./DialogPromotionStatistics";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import CustomDatePick from "@/views/widget/custom_date_pick/CustomDatePick.vue";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        CustomInput,
        Overlay,
        ListNodata,
        CustomDatePick,
    },
})
export default class extends DialogPromotionStatistics {}
</script>
