<template src="./DialogOrder.vue.html" lang="html"></template>
<style src="./DialogOrder.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogOrder from "./DialogOrder";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogOrder {}
</script>
