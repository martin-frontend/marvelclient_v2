<template src="./PageMine.vue.html" lang="html"></template>
<style src="./PageMine.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageMine from "./PageMine";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import { Watch } from "vue-property-decorator";

@Component({
    components: {
        Overlay,
    },
})
export default class extends PageMine {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
