<template src="./DialogGameRate.vue.html" lang="html"></template>
<style src="./DialogGameRate.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import DialogGameRate from "./DialogGameRate";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogGameRate {}
</script>
