<template src="./DlgPerformance.vue.html" lang="html"></template>
<style src="./DlgPerformance.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MoneyWinLost from "../money_win_lost/MoneyWinLost.vue";
import DlgPerformance from "./DlgPerformance";

@Component({
    components: {
        MoneyWinLost,
    },
})
export default class extends DlgPerformance {}
</script>
