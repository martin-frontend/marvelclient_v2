<template src="./DialogMarquee.vue.html" lang="html"></template>
<style src="./DialogMarquee.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
// import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogMarquee from "./DialogMarquee";
import horizontal_scroll from "@/_skin005/views/widget/horizontal_scroll/HorizontalScroll.vue";
@Component({
    components: {
        // Overlay
        horizontal_scroll,
    },
})
export default class extends DialogMarquee {}
</script>
