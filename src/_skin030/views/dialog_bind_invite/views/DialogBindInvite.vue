<template src="./DialogBindInvite.vue.html" lang="html"></template>
<style src="./DialogBindInvite.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
import Component from "vue-class-component";
import DialogBindInvite from "./DialogBindInvite";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogBindInvite {}
</script>
