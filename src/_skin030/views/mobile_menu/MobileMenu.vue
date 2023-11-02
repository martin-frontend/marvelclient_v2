<template src="./MobileMenu.vue.html" lang="html"></template>
<style src="./MobileMenu.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MobileMenu from "./MobileMenu";
import SvgaPlayer from "@/_skin030/views/widget/svga_player/SvgaPlayer.vue";

@Component({
    components: {
        SvgaPlayer,
    },
})
export default class extends MobileMenu {}
</script>
