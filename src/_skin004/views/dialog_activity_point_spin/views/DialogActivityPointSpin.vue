<template src="./DialogActivityPointSpin.vue.html" lang="html"></template>
<style src="./DialogActivityPointSpin.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
// import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogActivityPointSpin from "./DialogActivityPointSpin";
import Spin from "@/_skin004/views/dialog_activity_point_spin/widget/spin/Spin.vue";
import RulePanel from "@/_skin004/views/dialog_activity_point_spin/widget/rule_panel/RulePanel.vue";
import Award from "@/_skin004/views/dialog_activity_point_spin/widget/award/Award.vue";
import Promotion from "@/_skin004/views/dialog_activity_point_spin/widget/promotion/Promotion.vue";
import Rank from "@/_skin004/views/dialog_activity_point_spin/widget/rank/Rank.vue";
import Score from "@/_skin004/views/dialog_activity_point_spin/widget/score/Score.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
@Component({
    components: {
        // Overlay
        Spin,
        RulePanel,
        Award,
        Promotion,
        Rank,
        Score,
        Overlay,
    },
})
export default class extends DialogActivityPointSpin {}
</script>
