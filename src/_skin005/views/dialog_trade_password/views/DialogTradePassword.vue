<template src="./DialogTradePassword.vue.html" lang="html"></template>
<style src="./DialogTradePassword.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import Component from "vue-class-component";
import DialogTradePassword from "./DialogTradePassword";
import CustomPassword from "@/_skin005/views/widget/custom_password_nomal/CustomPasswordNomal.vue";

@Component({
    components: {
        CustomInput,
        CustomPassword,
    },
})
export default class extends DialogTradePassword {}
</script>
