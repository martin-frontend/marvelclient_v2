<template src="./PageSwap.vue.html" lang="html"></template>
<style src="./PageSwap.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageSwap from "./PageSwap";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
import Question from "@/_skin005/views/widget/question/Question.vue";
import Chart from "../widget/Chart.vue";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
@Component({
    components: {
        CustomInput,
        CustomSelect,
        Question,
        Chart,
    },
})
export default class extends PageSwap {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
