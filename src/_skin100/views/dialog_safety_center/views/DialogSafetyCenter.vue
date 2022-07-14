<template src="./DialogSafetyCenter.vue.html" lang="html"></template>
<style src="./DialogSafetyCenter.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogSafetyCenter from "./DialogSafetyCenter";
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/_skin100/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/_skin100/views/widget/custom_password/CustomPassword.vue";

@Component({
    components: {
        AdvertiseInLogin,
        CustomInput,
        CustomPassword,
        Overlay,
    },
})
export default class extends DialogSafetyCenter {}
</script>
