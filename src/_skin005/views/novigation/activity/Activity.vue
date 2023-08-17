<template src="./Activity.vue.html" lang="html"></template>
<style src="./Activity.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Activity from "./Activity";
import SvgaPlayer from "@/_skin005/views/widget/svga_player/SvgaPlayer.vue";

@Component({
    components: {
        SvgaPlayer,
    },
})
export default class extends Activity {}
</script>
