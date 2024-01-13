<template src="./DialogAward.vue.html" lang="html"></template>
<style src="./DialogAward.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogAward from "./DialogAward";
import SvgaPlayer from "@/_skin005/views/widget/svga_player/SvgaPlayer.vue";
@Component({
    components: {
        SvgaPlayer,
    },
})
export default class extends DialogAward {}
</script>
