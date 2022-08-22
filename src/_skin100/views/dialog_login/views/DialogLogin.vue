<template src="./DialogLogin.vue.html" lang="html"></template>
<style src="./DialogLogin.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import DialogGetVerity from "@/_skin100/views/dialog_get_verity_b/views/DialogGetVerity.vue";
import AdvertiseInLogin from "@/_skin100/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/_skin100/views/widget/custom_input_pic/CustomInput.vue";
import CustomPassword from "@/_skin100/views/widget/custom_password_pic/CustomPassword.vue";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogLogin from "./DialogLogin";

@Component({
    components: {
        DialogGetVerity,
        Overlay,
        CustomInput,
        CustomPassword,
        AdvertiseInLogin,
    },
})
export default class extends DialogLogin {}
</script>
