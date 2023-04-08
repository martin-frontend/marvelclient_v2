<template src="./DialogGoogleVerification.vue.html" lang="html"></template>
<style src="./DialogGoogleVerification.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogGoogleVerification from "./DialogGoogleVerification";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogGoogleVerification {}
</script>
