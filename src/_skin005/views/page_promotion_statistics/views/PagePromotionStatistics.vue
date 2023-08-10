<template src="./PagePromotionStatistics.vue.html" lang="html"></template>
<style src="./PagePromotionStatistics.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PagePromotionStatistics from "./PagePromotionStatistics";
import Question from "@/_skin005/views/widget/question/Question.vue";
import MaskTool from "@/_skin005/views/widget/mask_tool/MaskTool.vue";
import Fanyong from "@/_skin005/views/page_promotion_statistics/views/widget/fanyong/Fanyong.vue";
import Chart from "./widget/Chart.vue";
@Component({
    components: {
        Question,
        MaskTool,
        Fanyong,
        Chart,
    },
})
export default class extends PagePromotionStatistics {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
