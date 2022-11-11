<template src="./DialogStatisticsCredit.vue.html" lang="html"></template>
<style src="./DialogStatisticsCredit.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogStatisticsCredit from "./DialogStatisticsCredit";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";
import LoadMore from "@/views/widget/loadMore/LoadMore.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
        LoadMore,
    },
})
export default class extends DialogStatisticsCredit {}
</script>
