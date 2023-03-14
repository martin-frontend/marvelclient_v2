<template src="./DialogPromotionFloor.vue.html" lang="html"></template>
<style src="./DialogPromotionFloor.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin101/views/widget/custom_input/CustomInput.vue";
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogPromotionFloor from "./DialogPromotionFloor";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogPromotionFloor {}
</script>
