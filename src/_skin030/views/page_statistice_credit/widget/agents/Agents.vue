<template src="./Agents.vue.html" lang="html"></template>
<style src="./Agents.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Agents from "./Agents";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends Agents {}
</script>
