<template src="./DialogPerformanceDetail.vue.html" lang="html"></template>
<style src="./DialogPerformanceDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPerformanceDetail from "./DialogPerformanceDetail";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogPerformanceDetail {}
</script>
