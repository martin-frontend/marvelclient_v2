<template src="./DialogRecordExchange.vue.html" lang="html"></template>
<style src="./DialogRecordExchange.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogRecordExchange from "./DialogRecordExchange";
import ListNodata from "@/_skin100/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
    },
})
export default class extends DialogRecordExchange {}
</script>
