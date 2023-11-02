<template src="./DialogDirectlyBackwater.vue.html" lang="html"></template>
<style src="./DialogDirectlyBackwater.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogDirectlyBackwater from "./DialogDirectlyBackwater";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogDirectlyBackwater {}
</script>
