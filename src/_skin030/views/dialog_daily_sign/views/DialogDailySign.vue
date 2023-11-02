<template src="./DialogDailySign.vue.html" lang="html"></template>
<style src="./DialogDailySign.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogDailySign from "./DialogDailySign";
import DailyItem from "./widget/daily_item/DailyItem.vue";
@Component({
    components: {
        DailyItem,
    },
})
export default class extends DialogDailySign {}
</script>
