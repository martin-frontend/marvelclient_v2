<template src="./Header.vue.html" lang="html"></template>
<style src="./Header.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Wallet from "../widget/wallet/Wallet.vue";
import Marquee1 from "@/_skin005/views/widget/marquee1/Marquee1.vue";
import Header from "./Header";
import User from "@/_skin005/views/header/user/User.vue";
import GameSearch_pc from "@/_skin005/views/widget/game_search/GameSearch.vue";
import GameSearch from "./game_search/GameSearch.vue";
import SvgaPlayer from "@/_skin005/views/widget/svga_player/SvgaPlayer.vue";

@Component({
    components: {
        Wallet,
        Marquee1,
        User,
        GameSearch,
        SvgaPlayer,
        GameSearch_pc,
    },
})
export default class extends Header {}
</script>
