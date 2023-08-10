<template src="./Fanyong.vue.html" lang="html"></template>
<style src="./Fanyong.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Fanyong from "./Fanyong";
import MaskTool from "@/_skin005/views/widget/mask_tool/MaskTool.vue";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomMobileDatePicker from "@/_skin005/views/widget/custom_mobile_date_picker/CustomMobileDatePicker.vue";
@Component({
    components: {
        CustomInput,
        CustomMobileDatePicker,

    },
})
export default class extends Fanyong {}
</script>
