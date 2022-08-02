<template src="./TabExchange.vue.html" lang="html"></template>
<style src="./TabExchange.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin100/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/_skin100/views/widget/custom_password/CustomPassword.vue";
import CustomSelect from "@/_skin100/views/widget/custom_select/CustomSelect.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import TabExchange from "./TabExchange";

@Component({
    components: {
        CustomSelect,
        CustomInput,
        CustomPassword,
        Overlay,
    },
})
export default class extends TabExchange {}
</script>
