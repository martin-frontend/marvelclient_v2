<template src="@/_skin004_5/views/page_game_list/widget/game_search/GameSearch.vue.html" lang="html"></template>
<style src="@/_skin005/views/page_game_list/widget/game_search/GameSearch.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameSearch from "@/_skin004_5/views/page_game_list/widget/game_search/GameSearch";
import GameItem from "@/_skin004_5/views/page_game_list/widget/game_item/GameItem.vue";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
@Component({
    components: {
        GameItem,
        CustomInput,
    },
})
export default class extends GameSearch {}
</script>
