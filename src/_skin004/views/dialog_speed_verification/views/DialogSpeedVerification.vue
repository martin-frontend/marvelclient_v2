<template src="./DialogSpeedVerification.vue.html" lang="html"></template>
<style src="./DialogSpeedVerification.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogSpeedVerification from "./DialogSpeedVerification";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogSpeedVerification {}
</script>
