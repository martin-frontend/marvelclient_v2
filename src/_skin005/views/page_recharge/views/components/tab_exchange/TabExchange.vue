<template src="./TabExchange.vue.html" lang="html"></template>
<style src="./TabExchange.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomPassword from "@/_skin005/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
import Component from "vue-class-component";
import TabExchange from "./TabExchange";

@Component({
    components: {
        CustomSelect,
        CustomInput,
        CustomPassword,
    },
})
export default class extends TabExchange {}
</script>
