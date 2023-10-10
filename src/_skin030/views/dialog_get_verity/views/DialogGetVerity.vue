<template src="./DialogGetVerity.vue.html" lang="html"></template>
<style src="./DialogGetVerity.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
import Component from "vue-class-component";
import DialogGetVerity from "./DialogGetVerity";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogGetVerity {}
</script>
