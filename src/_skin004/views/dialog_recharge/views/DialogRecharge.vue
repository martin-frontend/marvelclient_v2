<template src="./DialogRecharge.vue.html" lang="html"></template>
<style src="./DialogRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import TabExchange from "./components/tab_exchange/TabExchange.vue";
import TabExchangeBankVnd from "./components/tab_exchange_bank_vnd/TabExchangeBankVnd.vue";
import TabRecharge from "./components/tab_recharge/TabRecharge.vue";
import TabTransfer from "./components/tab_transfer/TabTransfer.vue";
import DialogBankchar from "../../dialog_recharge_bankcharge/views/DialogRechargeBankcharge.vue";
import Component from "vue-class-component";
import DialogRecharge from "./DialogRecharge";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        TabExchange,
        TabExchangeBankVnd,
        TabRecharge,
        TabTransfer,
        ListNodata,
        DialogBankchar,
    },
})
export default class extends DialogRecharge {}
</script>
