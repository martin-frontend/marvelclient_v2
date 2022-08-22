<template src="./DialogManuallyUnstaking.vue.html" lang="html"></template>
<style src="./DialogManuallyUnstaking.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogManuallyUnstaking from "./DialogManuallyUnstaking";
import CustomInput from "@/_skin100/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogManuallyUnstaking {}
</script>
