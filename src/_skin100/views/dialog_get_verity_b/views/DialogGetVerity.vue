<template src="./DialogGetVerity.vue.html" lang="html"></template>
<style src="./DialogGetVerity.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin100/views/widget/custom_input/CustomInput.vue";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogGetVerity from "./DialogGetVerity";

@Component({
    components: {
        CustomInput,
        Overlay,
    },
})
export default class extends DialogGetVerity {}
</script>
