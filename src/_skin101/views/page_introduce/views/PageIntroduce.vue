<template src="./PageIntroduce.vue.html" lang="html"></template>
<style src="./PageIntroduce.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageIntroduce from "./PageIntroduce";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";

@Component({
    components: {
        Overlay,
    },
})
export default class extends PageIntroduce {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
