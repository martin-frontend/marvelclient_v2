<template src="./DialogActivityDetail.vue.html" lang="html"></template>
<style src="./DialogActivityDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogActivityDetail from "./DialogActivityDetail";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogActivityDetail {}
</script>
