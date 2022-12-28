<template src="./TabTransfer.vue.html" lang="html"></template>
<style src="./TabTransfer.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin003/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/_skin003/views/widget/custom_password/CustomPassword.vue";
import CustomSelect from "@/_skin003/views/widget/custom_select/CustomSelect.vue";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import TabTransfer from "./TabTransfer";

@Component({
    components: {
        CustomSelect,
        CustomInput,
        CustomPassword,
        Overlay,
    },
})
export default class extends TabTransfer {}
</script>
