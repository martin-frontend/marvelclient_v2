<template src="./DialogRecharge.vue.html" lang="html"></template>
<style src="./DialogRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import TabExchange from "./components/tab_exchange/TabExchange.vue";
import TabRecharge from "./components/tab_recharge/TabRecharge.vue";
import Component from "vue-class-component";
import DialogRecharge from "./DialogRecharge";

@Component({
    components: {
        TabExchange,
        TabRecharge,
    },
})
export default class extends DialogRecharge {}
</script>
