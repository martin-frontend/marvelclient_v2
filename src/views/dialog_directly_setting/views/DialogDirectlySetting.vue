<template src="./DialogDirectlySetting.vue.html" lang="html"></template>
<style src="./DialogDirectlySetting.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDirectlySetting from "./DialogDirectlySetting";


@Component({
    components: {
        Overlay,

    },
})
export default class extends DialogDirectlySetting {}
</script>
