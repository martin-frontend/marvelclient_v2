<template src="./DialogPledgeRecords.vue.html" lang="html"></template>
<style src="./DialogPledgeRecords.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import DialogPledgeRecords from "./DialogPledgeRecords";
import ListNodata from "@/_skin003/views/widget/list_nodata/ListNodata.vue";
import LoadMore from "@/_skin003/views/widget/loadMore/LoadMore.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
        LoadMore,
    },
})
export default class extends DialogPledgeRecords {}
</script>
