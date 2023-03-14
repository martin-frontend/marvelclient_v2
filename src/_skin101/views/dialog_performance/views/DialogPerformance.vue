<template src="./DialogPerformance.vue.html" lang="html"></template>
<style src="./DialogPerformance.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogPerformance from "./DialogPerformance";
import CustomSelect from "@/_skin101/views/widget/custom_select/CustomSelect.vue";
import ListNodata from "@/_skin101/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        CustomSelect,
        Overlay,
        ListNodata,
    },
})
export default class extends DialogPerformance {}
</script>
