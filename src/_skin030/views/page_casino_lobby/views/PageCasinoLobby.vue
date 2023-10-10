<template src="./PageCasinoLobby.vue.html" lang="html"></template>
<style src="./PageCasinoLobby.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageCasinoLobby from "./PageCasinoLobby";
import NoticeCard from "../widget/notice_card/NoticeCard.vue";
import GameSearch from "../widget/game_search/GameSearch.vue";
import GameList from "../widget/game_list/GameList.vue";
import VendorList from "../widget/vendor_list/VendorList.vue";
import horizontal_scroll from "@/_skin030/views/widget/horizontal_scroll/HorizontalScroll.vue";
@Component({
    components: {
        NoticeCard,
        GameSearch,
        GameList,
        VendorList,
        horizontal_scroll,
    },
})
export default class extends PageCasinoLobby {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
