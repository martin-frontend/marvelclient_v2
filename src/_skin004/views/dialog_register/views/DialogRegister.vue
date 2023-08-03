<template src="./DialogRegister.vue.html" lang="html"></template>
<style src="./DialogRegister.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import DialogGetVerity from "@/_skin004/views/dialog_get_verity/views/DialogGetVerity.vue";
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/views/widget/custom_password/CustomPassword.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogRegister from "./DialogRegister";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
@Component({
    components: {
        AdvertiseInLogin,
        CustomInput,
        CustomPassword,
        Overlay,
        DialogGetVerity,
        CustomSelect,
    },
})
export default class extends DialogRegister {}
</script>
