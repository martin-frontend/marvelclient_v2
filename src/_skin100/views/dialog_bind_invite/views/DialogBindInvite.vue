<template src="./DialogBindInvite.vue.html" lang="html"></template>
<style src="./DialogBindInvite.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin100/views/widget/custom_input/CustomInput.vue";
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogBindInvite from "./DialogBindInvite";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogBindInvite {}
</script>
