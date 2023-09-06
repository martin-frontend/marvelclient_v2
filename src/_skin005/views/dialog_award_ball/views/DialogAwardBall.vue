<template src="./DialogAwardBall.vue.html" lang="html"></template>
<style src="./DialogAwardBall.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
// import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogAwardBall from "./DialogAwardBall";
import SvgaPlayer from "@/_skin005/views/widget/svga_player/SvgaPlayer.vue";
import SingleBall from '@/_skin005/views/page_activity_slot/views/widget/single_ball/SingleBall.vue'
@Component({
    components: {
        SvgaPlayer,
        SingleBall,
    }
})
export default class extends DialogAwardBall {}
</script>
