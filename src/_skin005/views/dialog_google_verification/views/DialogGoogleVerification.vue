<template src="./DialogGoogleVerification.vue.html" lang="html"></template>
<style src="./DialogGoogleVerification.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogGoogleVerification from "./DialogGoogleVerification";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        CustomInput,
    }
})
export default class extends DialogGoogleVerification {}
</script>
