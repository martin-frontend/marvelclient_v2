<template src="./Introduce.vue.html" lang="html"></template>
<style src="./Introduce.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Introduce from "./Introduce";
import Overlay from "@/views/widget/overlay/Overlay.vue";

@Component({
    components: {
        Overlay,
    },
})
export default class extends Introduce {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
