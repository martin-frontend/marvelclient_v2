<template src="./PageGameListChess.vue.html" lang="html"></template>
<style src="./PageGameListChess.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import PageGameListChess from "./PageGameListChess";
import GameListSelect from "../widget/game_list_select/GameListSelect.vue";
import GameItem from "@/views/widget/game_item/GameItem.vue";

@Component({
    components: {
        Overlay,
        GameListSelect,
        GameItem,
    },
})
export default class extends PageGameListChess {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
