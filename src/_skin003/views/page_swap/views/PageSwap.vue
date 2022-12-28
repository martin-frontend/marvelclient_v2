<template src="./PageSwap.vue.html" lang="html"></template>
<style src="./PageSwap.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageSwap from "./PageSwap";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import CustomInput from "@/_skin003/views/widget/custom_input/CustomInput.vue";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import Question from "@/_skin003/views/widget/question/Question.vue";
import Chart from "../widget/Chart.vue";

@Component({
    components: {
        Overlay,
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
