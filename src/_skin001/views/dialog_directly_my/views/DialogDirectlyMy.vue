<template src="./DialogDirectlyMy.vue.html" lang="html"></template>
<style src="./DialogDirectlyMy.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectlyMy from "./DialogDirectlyMy";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogDirectlyMy {}
</script>
