<template src="./DialogDirectlyEasybetset.vue.html" lang="html"></template>
<style src="./DialogDirectlyEasybetset.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectlyEasybetset from "./DialogDirectlyEasybetset";
import CustomInput from "@/views/widget/custom_input/CustomInput.vue";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";
@Component({
    components: {
        Overlay,
        CustomInput,
        ListNodata,
    }
})
export default class extends DialogDirectlyEasybetset {}
</script>
