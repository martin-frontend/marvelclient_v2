<template src="./DialogRealName.vue.html" lang="html"></template>
<style src="./DialogRealName.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import DialogRealName from "./DialogRealName";
import CustomInput from "@/_skin003/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogRealName {}
</script>
