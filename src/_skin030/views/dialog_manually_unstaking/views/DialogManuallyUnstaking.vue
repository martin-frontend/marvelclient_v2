<template src="./DialogManuallyUnstaking.vue.html" lang="html"></template>
<style src="./DialogManuallyUnstaking.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogManuallyUnstaking from "./DialogManuallyUnstaking";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogManuallyUnstaking {}
</script>
