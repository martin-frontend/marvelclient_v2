<template src="./DlgBonusHistory.vue.html" lang="html"></template>
<style src="./DlgBonusHistory.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MoneyWinLost from "../money_win_lost/MoneyWinLost.vue";
import DlgBonusHistory from "./DlgBonusHistory";

@Component({
    components: {
        MoneyWinLost,
    },
})
export default class extends DlgBonusHistory {}
</script>
