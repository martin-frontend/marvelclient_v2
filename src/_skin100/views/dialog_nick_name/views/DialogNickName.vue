<template src="./DialogNickName.vue.html" lang="html"></template>
<style src="./DialogNickName.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin100/views/widget/custom_input/CustomInput.vue";
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogNickName from "./DialogNickName";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogNickName {}
</script>
