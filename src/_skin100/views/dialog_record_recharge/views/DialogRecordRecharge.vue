<template src="./DialogRecordRecharge.vue.html" lang="html"></template>
<style src="./DialogRecordRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogRecordRecharge from "./DialogRecordRecharge";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
    },
})
export default class extends DialogRecordRecharge {}
</script>
