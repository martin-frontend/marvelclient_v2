<template src="./DialogDirectlyAdduser.vue.html" lang="html"></template>
<style src="./DialogDirectlyAdduser.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectlyAdduser from "./DialogDirectlyAdduser";
import DialogGetVerity from "@/views/dialog_get_verity/views/DialogGetVerity.vue";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import CustomPassword from "@/views/widget/custom_password/CustomPassword.vue";

@Component({
    components: {
        CustomInput,
        CustomPassword,
        Overlay,
        DialogGetVerity,
    },
})
export default class extends DialogDirectlyAdduser {}
</script>
