<template src="./DialogPledge.vue.html" lang="html"></template>
<style src="./DialogPledge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPledge from "./DialogPledge";
import CustomInputButton from "@/views/widget/custom_input_buttom/CustomInputButton.vue";

@Component({
    components: {
        Overlay,
        CustomInputButton,
    },
})
export default class extends DialogPledge {}
</script>
