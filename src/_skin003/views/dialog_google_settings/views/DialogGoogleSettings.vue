<template src="./DialogGoogleSettings.vue.html" lang="html"></template>
<style src="./DialogGoogleSettings.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import DialogGoogleSettings from "./DialogGoogleSettings";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogGoogleSettings {}
</script>
