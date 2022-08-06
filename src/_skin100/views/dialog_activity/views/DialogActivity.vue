<template src="./DialogActivity.vue.html" lang="html"></template>
<style src="./DialogActivity.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogActivity from "./DialogActivity";
import ListNodata from "@/_skin100/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
    },
})
export default class extends DialogActivity {}
</script>
