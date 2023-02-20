<template src="./DialogNickName.vue.html" lang="html"></template>
<style src="./DialogNickName.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import Component from "vue-class-component";
import DialogNickName from "./DialogNickName";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogNickName {}
</script>
