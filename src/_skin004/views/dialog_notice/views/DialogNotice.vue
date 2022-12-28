<template src="./DialogNotice.vue.html" lang="html"></template>
<style src="./DialogNotice.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogNotice from "./DialogNotice";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogNotice {}
</script>
