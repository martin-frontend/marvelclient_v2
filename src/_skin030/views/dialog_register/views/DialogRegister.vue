<template src="./DialogRegister.vue.html" lang="html"></template>
<style src="./DialogRegister.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import AdvertiseInLogin from "@/_skin030/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomPassword from "@/_skin030/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
import Component from "vue-class-component";
import DialogRegister from "./DialogRegister";
import horizontal_scroll from "@/_skin030/views/widget/horizontal_scroll/HorizontalScroll.vue";
@Component({
    components: {
        AdvertiseInLogin,
        CustomInput,
        CustomPassword,
        horizontal_scroll,
    },
})
export default class extends DialogRegister {}
</script>
