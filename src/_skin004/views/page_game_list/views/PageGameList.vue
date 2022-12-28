<template src="./PageGameList.vue.html" lang="html"></template>
<style src="./PageGameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import PageGameList from "./PageGameList";
import GameListSelect from "../widget/game_list_select/GameListSelect.vue";
import GameItem from "@/views/widget/game_item/GameItem.vue";
import Activity from "@/_skin004/views/page_home/widget/activity/Activity.vue";
import Advertise from "@/_skin004/views/page_home/widget/advertise/Advertise.vue";

@Component({
    components: {
        Overlay,
        GameListSelect,
        GameItem,
        Activity,
        Advertise,
    },
})
export default class extends PageGameList {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
