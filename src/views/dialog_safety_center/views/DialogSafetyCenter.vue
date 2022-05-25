<template src="./DialogSafetyCenter.vue.html" lang="html"></template>
<style src="./DialogSafetyCenter.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogSafetyCenter from "./DialogSafetyCenter";
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        AdvertiseInLogin,
        CustomInput,
        Overlay
    }
})
export default class extends DialogSafetyCenter {}
</script>
