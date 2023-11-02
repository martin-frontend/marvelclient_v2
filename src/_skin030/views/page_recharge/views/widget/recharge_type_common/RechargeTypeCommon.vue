<template src="./RechargeTypeCommon.vue.html" lang="html"></template>
<style src="./RechargeTypeCommon.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import RechargeTypeCommon from "./RechargeTypeCommon";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomSelect from "@/_skin030/views/widget/custom_select/CustomSelect.vue";
import NewBtnYellow from "@/_skin030/views/widget/new_btn_yellow/NewBtnYellow.vue";

@Component({
    components: {
        CustomInput,
        CustomSelect,
        NewBtnYellow,
    },
})
export default class extends RechargeTypeCommon {}
</script>
