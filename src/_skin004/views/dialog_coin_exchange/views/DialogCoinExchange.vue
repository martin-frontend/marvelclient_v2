<template src="./DialogCoinExchange.vue.html" lang="html"></template>
<style src="./DialogCoinExchange.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogCoinExchange from "./DialogCoinExchange";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        Overlay,
        CustomSelect,
        CustomInput,
    },
})
export default class extends DialogCoinExchange {}
</script>
