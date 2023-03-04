<template src="./PageRecharge.vue.html" lang="html"></template>
<style src="./PageRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageRecharge from "./PageRecharge";
import TabExchange from "./components/tab_exchange/TabExchange.vue";
import TabRecharge from "./components/tab_recharge/TabRecharge.vue";
import TabTransfer from "./components/tab_transfer/TabTransfer.vue";

@Component({
    components: {
        TabExchange,
        TabRecharge,
        TabTransfer,
    },
})
export default class extends PageRecharge {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
