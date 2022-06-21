<template src="./DialogDirectly.vue.html" lang="html"></template>
<style src="./DialogDirectly.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectly from "./DialogDirectly";
import CustomInputButton from "@/views/widget/custom_input_buttom/CustomInputButton.vue";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        CustomInputButton,
        Overlay,
        ListNodata,
    },
})
export default class extends DialogDirectly {}
</script>
