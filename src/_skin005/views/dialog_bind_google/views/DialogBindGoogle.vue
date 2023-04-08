<template src="./DialogBindGoogle.vue.html" lang="html"></template>
<style src="./DialogBindGoogle.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogBindGoogle from "./DialogBindGoogle";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogBindGoogle {}
</script>
