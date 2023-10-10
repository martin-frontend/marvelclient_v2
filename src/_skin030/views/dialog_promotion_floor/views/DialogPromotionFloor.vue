<template src="./DialogPromotionFloor.vue.html" lang="html"></template>
<style src="./DialogPromotionFloor.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogPromotionFloor from "./DialogPromotionFloor";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogPromotionFloor {}
</script>
