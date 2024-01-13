<template src="./DialogActivity7days.vue.html" lang="html"></template>
<style src="./DialogActivity7days.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogActivity7days from "./DialogActivity7days";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogActivity7days {}
</script>
