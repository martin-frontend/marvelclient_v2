<template src="./DialogEmail.vue.html" lang="html"></template>
<style src="./DialogEmail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogEmail from "./DialogEmail";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogEmail {}
</script>
