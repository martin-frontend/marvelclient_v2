<template src="./DlgDirectDetail.vue.html" lang="html"></template>
<style src="./DlgDirectDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MoneyWinLost from "../money_win_lost/MoneyWinLost.vue";
import DlgDirectDetail from "./DlgDirectDetail";

@Component({
    components: {
        MoneyWinLost,
    },
})
export default class extends DlgDirectDetail {}
</script>
