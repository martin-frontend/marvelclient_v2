<template src="./DialogPerformanceDetail.vue.html" lang="html"></template>
<style src="./DialogPerformanceDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogPerformanceDetail from "./DialogPerformanceDetail";
import ListNodata from "@/_skin100/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
    },
})
export default class extends DialogPerformanceDetail {}
</script>
