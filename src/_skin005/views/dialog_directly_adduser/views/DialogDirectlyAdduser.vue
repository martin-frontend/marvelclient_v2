<template src="./DialogDirectlyAdduser.vue.html" lang="html"></template>
<style src="./DialogDirectlyAdduser.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogDirectlyAdduser from "./DialogDirectlyAdduser";
import DialogGetVerity from "@/views/dialog_get_verity/views/DialogGetVerity.vue";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomPassword from "@/_skin005/views/widget/custom_password_nomal/CustomPasswordNomal.vue";

@Component({
    components: {
        CustomInput,
        CustomPassword,
        DialogGetVerity,
    },
})
export default class extends DialogDirectlyAdduser {}
</script>
