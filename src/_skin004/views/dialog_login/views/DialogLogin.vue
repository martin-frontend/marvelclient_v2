<template src="./DialogLogin.vue.html" lang="html"></template>
<style src="./DialogLogin.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import DialogGetVerity from "@/_skin004/views/dialog_get_verity/views/DialogGetVerity.vue";
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/views/widget/custom_password/CustomPassword.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogLogin from "./DialogLogin";

@Component({
    components: {
        Overlay,
        CustomInput,
        CustomPassword,
        AdvertiseInLogin,
        DialogGetVerity,
    },
})
export default class extends DialogLogin {}
</script>
