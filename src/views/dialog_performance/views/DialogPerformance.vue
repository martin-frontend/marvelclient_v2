<template src="./DialogPerformance.vue.html" lang="html"></template>
<style src="./DialogPerformance.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPerformance from "./DialogPerformance";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogPerformance {}
</script>
