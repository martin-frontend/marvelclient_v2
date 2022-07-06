<template src="./DialogRegister.vue.html" lang="html"></template>
<style src="./DialogRegister.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/views/widget/custom_password/CustomPassword.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogRegister from "./DialogRegister";

@Component({
    components: {
        AdvertiseInLogin,
        CustomInput,
        CustomPassword,
        Overlay,
    },
})
export default class extends DialogRegister {}
</script>
