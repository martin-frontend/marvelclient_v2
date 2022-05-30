<template src="./DialogPledgeRecords.vue.html" lang="html"></template>
<style src="./DialogPledgeRecords.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogPledgeRecords from "./DialogPledgeRecords";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogPledgeRecords {}
</script>
