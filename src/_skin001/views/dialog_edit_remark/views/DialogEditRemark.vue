<template src="./DialogEditRemark.vue.html" lang="html"></template>
<style src="./DialogEditRemark.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogEditRemark from "./DialogEditRemark";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
@Component({
    components: {
        Overlay,
        CustomInput,
    }
})
export default class extends DialogEditRemark {}
</script>
