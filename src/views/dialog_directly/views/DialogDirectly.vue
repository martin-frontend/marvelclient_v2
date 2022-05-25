<template src="./DialogDirectly.vue.html" lang="html"></template>
<style src="./DialogDirectly.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectly from "./DialogDirectly";
import CustomInputButton from "@/views/widget/custom_input_buttom/CustomInputButton.vue";

@Component({
    components: {
        CustomInputButton,
        Overlay,
    },
})
export default class extends DialogDirectly {}
</script>
