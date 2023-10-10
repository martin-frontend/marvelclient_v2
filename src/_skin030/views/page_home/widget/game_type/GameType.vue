<template src="./GameType.vue.html" lang="html"></template>
<style src="./GameType.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import GameItem from "@/_skin030/views/page_game_list/widget/game_item/GameItem.vue";
import Component from "vue-class-component";
import GameType from "./GameType";

@Component({
    components: {
        GameItem,
    },
})
export default class extends GameType {}
</script>
