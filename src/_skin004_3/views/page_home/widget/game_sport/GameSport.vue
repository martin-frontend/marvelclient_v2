<template src="./GameSport.vue.html" lang="html"></template>
<style src="./GameSport.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameSport from "@/_skin004/views/page_home/widget/game_sport/GameSport";
import GameSportItem from "@/_skin004/views/page_home/widget/game_sport_item/GameSportItem.vue";

@Component({
    components: {
        GameSportItem,
    },
})
export default class extends GameSport {}
</script>
