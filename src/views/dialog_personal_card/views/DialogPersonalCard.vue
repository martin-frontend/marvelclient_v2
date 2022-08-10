<template src="./DialogPersonalCard.vue.html" lang="html"></template>
<style src="./DialogPersonalCard.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPersonalCard from "./DialogPersonalCard";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogPersonalCard {}
</script>
