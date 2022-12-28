<template src="./TabExchangeBankVnd.vue.html" lang="html"></template>
<style src="./TabExchangeBankVnd.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/views/widget/custom_password/CustomPassword.vue";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import TabExchangeBankVnd from "./TabExchangeBankVnd";

@Component({
    components: {
        CustomSelect,
        CustomInput,
        CustomPassword,
        Overlay,
    },
})
export default class extends TabExchangeBankVnd {}
</script>
