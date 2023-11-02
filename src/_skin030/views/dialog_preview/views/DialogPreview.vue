<template src="./DialogPreview.vue.html" lang="html"></template>
<style src="./DialogPreview.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPreview from "./DialogPreview";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogPreview {}
</script>
