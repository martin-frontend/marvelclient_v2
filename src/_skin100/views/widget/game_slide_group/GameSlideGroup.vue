<template src="./GameSlideGroup.vue.html" lang="html"></template>
<style src="./GameSlideGroup.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameItem from "../game_item/GameItem.vue";
import GameSlideGroup from "./GameSlideGroup";

@Component({
    components: {
        GameItem,
    },
})
export default class extends GameSlideGroup {}
</script>
