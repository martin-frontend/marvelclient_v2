<template src="./PageSwap.vue.html" lang="html"></template>
<style src="./PageSwap.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageSwap from "./PageSwap";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import Question from "@/views/widget/question/Question.vue";

@Component({
    components: {
        Overlay,
        CustomInput,
        Question,
    },
})
export default class extends PageSwap {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
