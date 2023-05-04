<template src="./DialogPerformanceDetail.vue.html" lang="html"></template>
<style src="./DialogPerformanceDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogPerformanceDetail from "./DialogPerformanceDetail";
import horizontal_scroll from "@/_skin005/views/widget/horizontal_scroll/HorizontalScroll.vue";
@Component({
    components: {
        horizontal_scroll,
    },
})
export default class extends DialogPerformanceDetail {}
</script>
