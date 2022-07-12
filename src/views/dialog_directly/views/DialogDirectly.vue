<template src="./DialogDirectly.vue.html" lang="html"></template>
<style src="./DialogDirectly.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectly from "./DialogDirectly";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        CustomInput,
        Overlay,
        ListNodata,
    },
})
export default class extends DialogDirectly {}
</script>
