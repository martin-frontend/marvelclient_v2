<template src="./TradePassword.vue.html" lang="html"></template>
<style src="./TradePassword.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import TradePassword from "./TradePassword";
import CustomPassword from "@/_skin030/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        CustomInput,
        CustomPassword,
    },
})
export default class extends TradePassword {}
</script>
