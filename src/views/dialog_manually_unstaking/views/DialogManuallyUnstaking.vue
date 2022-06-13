<template src="./DialogManuallyUnstaking.vue.html" lang="html"></template>
<style src="./DialogManuallyUnstaking.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogManuallyUnstaking from "./DialogManuallyUnstaking";
import CustomInputButton from "@/views/widget/custom_input_buttom/CustomInputButton.vue";

@Component({
    components: {
        Overlay,
        CustomInputButton,
    },
})
export default class extends DialogManuallyUnstaking {}
</script>
