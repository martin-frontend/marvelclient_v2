<template src="./DialogTest.vue.html" lang="html"></template>
<style src="./DialogTest.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogTest from "./DialogTest";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogTest {}
</script>
