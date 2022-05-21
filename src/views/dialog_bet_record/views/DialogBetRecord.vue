<template src="./DialogBetRecord.vue.html" lang="html"></template>
<style src="./DialogBetRecord.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogBetRecord from "./DialogBetRecord";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogBetRecord {}
</script>
