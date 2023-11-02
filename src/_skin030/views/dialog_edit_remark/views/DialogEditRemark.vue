<template src="./DialogEditRemark.vue.html" lang="html"></template>
<style src="./DialogEditRemark.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogEditRemark from "./DialogEditRemark";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogEditRemark {}
</script>
