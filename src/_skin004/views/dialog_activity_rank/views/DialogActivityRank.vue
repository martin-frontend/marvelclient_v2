<template src="./DialogActivityRank.vue.html" lang="html"></template>
<style src="./DialogActivityRank.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
// import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogActivityRank from "./DialogActivityRank";
import horizontal_scroll from "@/_skin005/views/widget/horizontal_scroll/HorizontalScroll.vue";
import Category from "@/_skin004/views/dialog_activity_rank/widget/category/Category.vue";
import Rank from "@/_skin004/views/dialog_activity_rank/widget/rank/Rank.vue";
import GameItem from "@/_skin004/views/dialog_activity_rank/widget/game_item/GameItem.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
@Component({
    components: {
        // Overlay
        horizontal_scroll,
        Category,
        Rank,
        GameItem,
        Overlay
    },
})
export default class extends DialogActivityRank {}
</script>
