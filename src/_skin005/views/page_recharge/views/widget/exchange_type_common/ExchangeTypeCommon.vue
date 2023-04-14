<template src="./ExchangeTypeCommon.vue.html" lang="html"></template>
<style src="./ExchangeTypeCommon.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import ExchangeTypeCommon from "./ExchangeTypeCommon";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomPassword from "@/_skin005/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
@Component({
    components: {
        CustomSelect,
        CustomInput,
        CustomPassword,
    },
})
export default class extends ExchangeTypeCommon {}
</script>
