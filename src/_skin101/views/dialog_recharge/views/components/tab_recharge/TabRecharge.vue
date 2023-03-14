<template src="./TabRecharge.vue.html" lang="html"></template>
<style src="./TabRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin101/views/widget/custom_input/CustomInput.vue";
import CustomSelect from "@/_skin101/views/widget/custom_select/CustomSelect.vue";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import TabRecharge from "./TabRecharge";

@Component({
    components: {
        CustomInput,
        CustomSelect,
        Overlay,
    },
})
export default class extends TabRecharge {}
</script>
