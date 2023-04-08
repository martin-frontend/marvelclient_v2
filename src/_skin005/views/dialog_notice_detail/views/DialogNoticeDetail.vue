<template src="./DialogNoticeDetail.vue.html" lang="html"></template>
<style src="./DialogNoticeDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogNoticeDetail from "./DialogNoticeDetail";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogNoticeDetail {}
</script>
