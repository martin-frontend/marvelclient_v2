<template src="./PageExtension.vue.html" lang="html"></template>
<style src="./PageExtension.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageExtension from "./PageExtension";

@Component
export default class extends PageExtension {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
