<template src="./DialogDirectlyGameset.vue.html" lang="html"></template>
<style src="./DialogDirectlyGameset.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectlyGameset from "./DialogDirectlyGameset";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogDirectlyGameset {}
</script>
