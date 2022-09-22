<template src="./DialogGoogleVerification.vue.html" lang="html"></template>
<style src="./DialogGoogleVerification.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogGoogleVerification from "./DialogGoogleVerification";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogGoogleVerification {}
</script>
