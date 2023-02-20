<template src="./TabRecharge.vue.html" lang="html"></template>
<style src="./TabRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
import Component from "vue-class-component";
import TabRecharge from "./TabRecharge";

@Component({
    components: {
        CustomInput,
        CustomSelect,
    },
})
export default class extends TabRecharge {}
</script>
