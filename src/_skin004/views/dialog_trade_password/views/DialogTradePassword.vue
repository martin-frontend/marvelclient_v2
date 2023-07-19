<template src="./DialogTradePassword.vue.html" lang="html"></template>
<style src="./DialogTradePassword.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import DialogGetVerity from "@/views/dialog_get_verity/views/DialogGetVerity.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogTradePassword from "./DialogTradePassword";
import CustomPassword from "@/views/widget/custom_password/CustomPassword.vue";

@Component({
    components: {
        Overlay,
        CustomInput,
        CustomPassword,
        DialogGetVerity,
    },
})
export default class extends DialogTradePassword {}
</script>
