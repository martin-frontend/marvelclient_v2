<template src="./DialogOfficialMail.vue.html" lang="html"></template>
<style src="./DialogOfficialMail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogOfficialMail from "./DialogOfficialMail";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogOfficialMail {}
</script>
