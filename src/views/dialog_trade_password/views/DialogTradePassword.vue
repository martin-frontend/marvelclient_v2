<template src="./DialogTradePassword.vue.html" lang="html"></template>
<style src="./DialogTradePassword.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogTradePassword from "./DialogTradePassword";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogTradePassword {}
</script>
