<template src="./LotteryList.vue.html" lang="html"></template>
<style src="./LotteryList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import LotteryList from "./LotteryList";
import LotteryItem from "../lottery_item/LotteryItem.vue";

@Component({
    components: {
        LotteryItem,
    },
})
export default class extends LotteryList {}
</script>
