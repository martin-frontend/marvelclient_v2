<template src="./GameList.vue.html" lang="html"></template>
<style src="./GameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameList from "./GameList";
import GameItem from "../game_item/GameItem.vue";
@Component({
    components: {
        GameItem,
    },
})
export default class extends GameList {}
</script>
