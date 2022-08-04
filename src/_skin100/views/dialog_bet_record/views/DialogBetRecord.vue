<template src="./DialogBetRecord.vue.html" lang="html"></template>
<style src="./DialogBetRecord.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogBetRecord from "./DialogBetRecord";
import CustomSelect from "@/_skin100/views/widget/custom_select/CustomSelect.vue";
import ListNodata from "@/_skin100/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        CustomSelect,
        Overlay,
        ListNodata,
    },
})
export default class extends DialogBetRecord {}
</script>
