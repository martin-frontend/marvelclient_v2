<template src="./PageLossCommission.vue.html" lang="html"></template>
<style src="./PageLossCommission.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageLossCommission from "./PageLossCommission";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Question from "@/_skin005/views/widget/question/Question.vue";
import DlgBonusHistory from "../widget/dlg_bonus_history/DlgBonusHistory.vue";
import DlgPerformance from "../widget/dlg_performance/DlgPerformance.vue";
import DlgDirectDetail from "../widget/dlg_direct_detail/DlgDirectDetail.vue";
import MoneyWinLost from "../widget/money_win_lost/MoneyWinLost.vue";

@Component({
    components: {
        Question,
        Overlay,
        DlgBonusHistory,
        DlgPerformance,
        DlgDirectDetail,
        MoneyWinLost,
    },
})
export default class extends PageLossCommission {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
