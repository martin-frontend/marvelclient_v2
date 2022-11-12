<template src="./DialogDirectlyAgentset.vue.html" lang="html"></template>
<style src="./DialogDirectlyAgentset.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectlyAgentset from "./DialogDirectlyAgentset";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";

@Component({
    components: {
        Overlay,
        CustomInput,
    }
})
export default class extends DialogDirectlyAgentset {}
</script>
