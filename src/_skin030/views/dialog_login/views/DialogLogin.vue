<template src="./DialogLogin.vue.html" lang="html"></template>
<style src="./DialogLogin.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import AdvertiseInLogin from "@/_skin030/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomInputLoginMobile from "@/_skin030/views/widget/custom_input_nomal_login_mobile/CustomInputNomal.vue";
import CustomPassword from "@/_skin030/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
import CustomPasswordLoginMobile from "@/_skin030/views/widget/custom_password_nomal_login_mobile/CustomPasswordNomal.vue";
import Component from "vue-class-component";
import DialogLogin from "./DialogLogin";

@Component({
    components: {
        CustomInput,
        CustomPassword,
        AdvertiseInLogin,
        CustomInputLoginMobile,
        CustomPasswordLoginMobile,
    },
})
export default class extends DialogLogin {}
</script>
