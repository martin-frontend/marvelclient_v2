<template src="./DialogPromotionStatistics.vue.html" lang="html"></template>
<style src="./DialogPromotionStatistics.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogPromotionStatistics from "./DialogPromotionStatistics";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomDatePick from "@/views/widget/custom_date_pick/CustomDatePick.vue";

@Component({
    components: {
        CustomInput,
        CustomDatePick,
    },
})
export default class extends DialogPromotionStatistics {}
</script>
