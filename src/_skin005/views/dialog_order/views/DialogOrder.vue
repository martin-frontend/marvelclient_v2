<template src="./DialogOrder.vue.html" lang="html"></template>
<style src="./DialogOrder.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogOrder from "./DialogOrder";
import FootballOrder from "./widget/football_order/FootballOrder.vue"
@Component({
    components: {
        FootballOrder,
    },
})
export default class extends DialogOrder {}
</script>
