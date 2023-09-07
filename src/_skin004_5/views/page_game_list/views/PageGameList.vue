<template src="@/_skin004_5/views/page_game_list/views/PageGameList.vue.html" lang="html"></template>
<style src="@/_skin004/views/page_game_list/views/PageGameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import PageGameList from "@/_skin004_5/views/page_game_list/views/PageGameList";
import GameListSelect from "@/_skin004/views/page_game_list/widget/game_list_select/GameListSelect.vue";
import GameItem from "@/_skin004/views/widget/game_item/GameItem.vue";
import Activity from "@/_skin004/views/page_home/widget/activity/Activity.vue";
import Advertise from "@/_skin004/views/page_home/widget/advertise/Advertise.vue";
import Marquee1 from "@/_skin004/views/page_home/widget/marquee1/Marquee1.vue";
import GameSearch from "@/_skin004_5/views/page_game_list/widget/game_search/GameSearch.vue";

@Component({
    components: {
        Overlay,
        GameListSelect,
        GameItem,
        Activity,
        Advertise,
        Marquee1,
        GameSearch,
    },
})
export default class extends PageGameList {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
