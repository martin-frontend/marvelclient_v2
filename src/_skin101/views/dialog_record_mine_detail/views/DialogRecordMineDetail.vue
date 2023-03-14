<template src="./DialogRecordMineDetail.vue.html" lang="html"></template>
<style src="./DialogRecordMineDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogRecordMineDetail from "./DialogRecordMineDetail";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogRecordMineDetail {}
</script>
