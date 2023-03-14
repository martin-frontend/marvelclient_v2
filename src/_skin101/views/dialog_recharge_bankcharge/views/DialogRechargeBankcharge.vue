<template src="./DialogRechargeBankcharge.vue.html" lang="html"></template>
<style src="./DialogRechargeBankcharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogRechargeBankcharge from "./DialogRechargeBankcharge";
import CustomInput from "@/_skin101/views/widget/custom_input/CustomInput.vue";
@Component({
    components: {
        Overlay,
        CustomInput,
    },
})
export default class extends DialogRechargeBankcharge {}
</script>
