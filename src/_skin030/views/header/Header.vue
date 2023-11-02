<template src="./Header.vue.html" lang="html"></template>
<style src="./Header.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Wallet from "../widget/wallet/Wallet.vue";
import Marquee1 from "../widget/marquee1/Marquee1.vue";
import Header from "./Header";
import User from "./user/User.vue";
import GameSearch from "@/_skin030/views/widget/game_search/GameSearch.vue";
import SvgaPlayer from "@/_skin030/views/widget/svga_player/SvgaPlayer.vue";

@Component({
    components: {
        Wallet,
        Marquee1,
        User,
        GameSearch,
        SvgaPlayer,
    },
})
export default class extends Header {}
</script>
