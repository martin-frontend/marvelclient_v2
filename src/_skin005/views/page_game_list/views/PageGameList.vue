<template src="./PageGameList.vue.html" lang="html"></template>
<style src="./PageGameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageGameList from "./PageGameList";
import GameListSelect from "../widget/game_list_select/GameListSelect.vue";
import GameItem from "../widget/game_item/GameItem.vue";

import Activity from "@/_skin005/views/page_home/widget/activity/Activity.vue";
import Advertise from "@/_skin005/views/page_home/widget/advertise/Advertise.vue";
import ImgLoader from "@/_skin005/views/widget/img_loader/ImgLoader.vue";
import Marquee1 from "../../widget/marquee1/Marquee1.vue";
@Component({
    components: {
        GameListSelect,
        GameItem,
        Activity,
        Advertise,
        ImgLoader,
        Marquee1,
    },
})
export default class extends PageGameList {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
