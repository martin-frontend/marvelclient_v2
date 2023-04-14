<template src="./RechargeType9.vue.html" lang="html"></template>
<style src="./RechargeType9.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import RechargeType9 from "./RechargeType9";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
@Component({
    components: {
        CustomInput,
        CustomSelect,
    },
})
export default class extends RechargeType9 {}
</script>
