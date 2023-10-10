<template src="./DialogPlatUsersVerification.vue.html" lang="html"></template>
<style src="./DialogPlatUsersVerification.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPlatUsersVerification from "./DialogPlatUsersVerification";
import CustomSelect from "@/_skin030/views/widget/custom_select/CustomSelect.vue";
import CustomInput from "@/_skin030/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        Overlay,
        CustomSelect,
        CustomInput,
    },
})
export default class extends DialogPlatUsersVerification {}
</script>
