<template src="./DialogLogin.vue.html" lang="html"></template>
<style src="./DialogLogin.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import DialogGetVerity from "@/_skin005/views/dialog_get_verity/views/DialogGetVerity.vue";
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomPassword from "@/_skin005/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
import Component from "vue-class-component";
import DialogLogin from "./DialogLogin";

@Component({
    components: {
        CustomInput,
        CustomPassword,
        AdvertiseInLogin,
        DialogGetVerity,
    },
})
export default class extends DialogLogin {}
</script>
