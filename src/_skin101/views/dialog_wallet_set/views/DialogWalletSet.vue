<template src="./DialogWalletSet.vue.html" lang="html"></template>
<style src="./DialogWalletSet.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogWalletSet from "./DialogWalletSet";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogWalletSet {}
</script>
