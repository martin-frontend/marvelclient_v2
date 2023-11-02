<template src="./TabRecharge.vue.html" lang="html"></template>
<style src="./TabRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomSelect from "@/_skin030/views/widget/custom_select/CustomSelect.vue";
import Component from "vue-class-component";
import TabRecharge from "./TabRecharge";
import RechargeType9 from "@/_skin030/views/dialog_recharge/views/widget/recharge_type_9/RechargeType9.vue";
import RechargeTypeCommon from "@/_skin030/views/dialog_recharge/views/widget/recharge_type_common/RechargeTypeCommon.vue";
@Component({
    components: {
        CustomInput,
        CustomSelect,
        RechargeType9,
        RechargeTypeCommon,
    },
})
export default class extends TabRecharge {}
</script>
