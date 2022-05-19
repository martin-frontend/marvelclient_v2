<template src="./DialogDirectly.vue.html" lang="html"></template>
<style src="./DialogDirectly.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectly from "./DialogDirectly";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogDirectly {}
</script>
