<template src="./PageGameList.vue.html" lang="html"></template>
<style src="./PageGameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import PageGameList from "./PageGameList";
import GameListSelect from "../widget/game_list_select/GameListSelect.vue";
import GameSlideGroup from "@/views/widget/game_slide_group/GameSlideGroup.vue";
import GameItem from "@/views/widget/game_item/GameItem.vue";
import GameListSearch from "../widget/game_list_search/GameListSearch.vue";

@Component({
    components: {
        Overlay,
        GameListSelect,
        GameSlideGroup,
        GameItem,
        GameListSearch
    },
})
export default class extends PageGameList {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
