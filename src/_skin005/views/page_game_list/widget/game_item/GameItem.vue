<template src="./GameItem.vue.html" lang="html"></template>
<style src="./GameItem.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameItem from "./GameItem";

import ImgLoader from "@/_skin005/views/widget/img_loader/ImgLoader.vue";
@Component({
    components: {
        ImgLoader,
    },
})
export default class extends GameItem {}
</script>
