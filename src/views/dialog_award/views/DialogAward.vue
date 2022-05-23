<template src="./DialogAward.vue.html" lang="html"></template>
<style src="./DialogAward.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogAward from "./DialogAward";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogAward {}
</script>
