<template src="./PageCasinoList.vue.html" lang="html"></template>
<style src="./PageCasinoList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageCasinoList from "./PageCasinoList";
import GameList from "@/_skin030/views/page_casino_lobby/widget/game_list/GameList.vue";
import GameSearch from "@/_skin030/views/page_casino_lobby/widget/game_search/GameSearch.vue";
import VendorList from "@/_skin030/views/page_casino_lobby/widget/vendor_list/VendorList.vue";
import RecentBetting from "@/_skin030/views/page_home/widget/recent_betting/RecentBetting.vue";
@Component({
    components: {
        GameList,
        GameSearch,
        VendorList,
        RecentBetting,
    },
})
export default class extends PageCasinoList {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
