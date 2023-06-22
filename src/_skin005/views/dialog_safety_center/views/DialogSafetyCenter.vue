<template src="./DialogSafetyCenter.vue.html" lang="html"></template>
<style src="./DialogSafetyCenter.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogSafetyCenter from "./DialogSafetyCenter";
import AdvertiseInLogin from "@/_skin005/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import CustomPassword from "@/_skin005/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
import TradePassword from "./trade_password/TradePassword.vue";
@Component({
    components: {
        AdvertiseInLogin,
        CustomInput,
        CustomPassword,
        TradePassword,
    },
})
export default class extends DialogSafetyCenter {}
</script>
