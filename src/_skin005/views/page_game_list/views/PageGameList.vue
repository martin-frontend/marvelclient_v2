<template src="./PageGameList.vue.html" lang="html"></template>
<style src="./PageGameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageGameList from "./PageGameList";
import GameListSelect from "../widget/game_list_select/GameListSelect.vue";
import GameItem from "../widget/game_item/GameItem.vue";

import Activity from "@/_skin005/views/page_home/widget/activity/Activity.vue";
import ImgLoader from "@/_skin005/views/widget/img_loader/ImgLoader.vue";
import Marquee1 from "../../widget/marquee1/Marquee1.vue";
import Category from "@/_skin005/views/page_home/widget/category/Category.vue";
import GameSearch from "@/_skin005/views/page_game_list/widget/game_search/GameSearch.vue";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
import LotteryList from "../widget/lottery_list/LotteryList.vue";
@Component({
    components: {
        GameListSelect,
        GameItem,
        Activity,
        ImgLoader,
        Marquee1,
        Category,
        GameSearch,
        CustomSelect,
        LotteryList,
    },
})
export default class extends PageGameList {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
