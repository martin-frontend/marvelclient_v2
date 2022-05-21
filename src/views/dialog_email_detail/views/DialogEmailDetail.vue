<template src="./DialogEmailDetail.vue.html" lang="html"></template>
<style src="./DialogEmailDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogEmailDetail from "./DialogEmailDetail";

@Component({
    components: {
        Overlay
    }
})
export default class extends DialogEmailDetail {}
</script>
