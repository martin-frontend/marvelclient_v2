<template src="./DialogRecordMine.vue.html" lang="html"></template>
<style src="./DialogRecordMine.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogRecordMine from "./DialogRecordMine";
import ListNodata from "@/_skin100/views/widget/list_nodata/ListNodata.vue";
@Component({
    components: {
        Overlay,
        ListNodata,
    },
})
export default class extends DialogRecordMine {}
</script>
