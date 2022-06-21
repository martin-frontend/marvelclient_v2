<template src="./GameSearch.vue.html" lang="html"></template>
<style src="./GameSearch.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameSearch from "./GameSearch";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";
import GameSearchItem from "../widget/game_search_item/GameSearchItem.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
        GameSearchItem,
    },
})
export default class extends GameSearch {}
</script>
