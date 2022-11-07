<template src="./DialogRecharge.vue.html" lang="html"></template>
<style src="./DialogRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import TabExchange from "./components/tab_exchange/TabExchange.vue";
import TabRecharge from "./components/tab_recharge/TabRecharge.vue";
import TabTransfer from "./components/tab_transfer/TabTransfer.vue";
import Component from "vue-class-component";
import DialogRecharge from "./DialogRecharge";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        TabExchange,
        TabRecharge,
        TabTransfer,
        ListNodata,
    },
})
export default class extends DialogRecharge {}
</script>
