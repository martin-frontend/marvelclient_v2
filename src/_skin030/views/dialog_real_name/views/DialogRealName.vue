<template src="./DialogRealName.vue.html" lang="html"></template>
<style src="./DialogRealName.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogRealName from "./DialogRealName";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogRealName {}
</script>
