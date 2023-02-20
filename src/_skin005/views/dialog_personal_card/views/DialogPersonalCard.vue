<template src="./DialogPersonalCard.vue.html" lang="html"></template>
<style src="./DialogPersonalCard.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import Component from "vue-class-component";
import DialogPersonalCard from "./DialogPersonalCard";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogPersonalCard {}
</script>
