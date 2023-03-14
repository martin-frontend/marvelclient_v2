<template src="./DialogSafetyCenter.vue.html" lang="html"></template>
<style src="./DialogSafetyCenter.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogGetVerity from "@/_skin101/views/dialog_get_verity/views/DialogGetVerity.vue";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogSafetyCenter from "./DialogSafetyCenter";
import AdvertiseInLogin from "@/_skin101/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/_skin101/views/widget/custom_input_pic/CustomInput.vue";
import CustomPassword from "@/_skin101/views/widget/custom_password_pic/CustomPassword.vue";

@Component({
    components: {
        DialogGetVerity,
        AdvertiseInLogin,
        CustomInput,
        CustomPassword,
        Overlay,
    },
})
export default class extends DialogSafetyCenter {}
</script>
