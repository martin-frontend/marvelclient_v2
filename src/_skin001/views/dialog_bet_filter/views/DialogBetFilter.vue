<template src="./DialogBetFilter.vue.html" lang="html"></template>
<style src="./DialogBetFilter.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogBetFilter from "./DialogBetFilter";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogBetFilter {}
</script>
