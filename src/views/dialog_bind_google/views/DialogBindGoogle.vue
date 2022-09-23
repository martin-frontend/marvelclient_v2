<template src="./DialogBindGoogle.vue.html" lang="html"></template>
<style src="./DialogBindGoogle.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogBindGoogle from "./DialogBindGoogle";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        CustomInput,
        Overlay
    }
})
export default class extends DialogBindGoogle {}
</script>
