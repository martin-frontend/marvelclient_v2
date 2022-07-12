<template src="./DialogPledge.vue.html" lang="html"></template>
<style src="./DialogPledge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPledge from "./DialogPledge";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogPledge {}
</script>
