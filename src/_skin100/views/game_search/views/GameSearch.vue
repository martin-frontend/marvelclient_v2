<template src="./GameSearch.vue.html" lang="html"></template>
<style src="./GameSearch.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameSearch from "./GameSearch";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import ListNodata from "@/_skin100/views/widget/list_nodata/ListNodata.vue";
import GameSearchItem from "../widget/game_search_item/GameSearchItem.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
        GameSearchItem,
    },
})
export default class extends GameSearch {
    // mounted() {
    //     var v_main = document.querySelector("#page");
    //     v_main?.setAttribute("style", "filter: blur(6px);");
    // }
    // beforeDestroy() {
    //     var v_main = document.querySelector("#page");
    //     v_main?.removeAttribute("style");
    // }
}
</script>
