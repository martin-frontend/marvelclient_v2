<template src="./DialogLogin.vue.html" lang="html"></template>
<style src="./DialogLogin.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogLogin from "./DialogLogin";

@Component({
    components: {
        Overlay,
        CustomInput,
        AdvertiseInLogin,
    },
})
export default class extends DialogLogin {}
</script>
