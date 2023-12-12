<template src="./Header.vue.html" lang="html"></template>
<style src="@/_skin005/views/header/Header.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Wallet from "@/_skin005/views/widget/wallet/Wallet.vue";
import Marquee1 from "@/_skin005/views/widget/marquee1/Marquee1.vue";
import Header from "@/_skin005/views/header/Header";
import User from "@/_skin005/views/header/user/User.vue";
import GameSearch from "@/_skin005/views/widget/game_search/GameSearch.vue";
import SvgaPlayer from "@/_skin005/views/widget/svga_player/SvgaPlayer.vue";

import { dateFormatForTimezone } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import GameConfig from "@/core/config/GameConfig";
import Timezone from "@/core/Timezone";

@Component({
    components: {
        Wallet,
        Marquee1,
        User,
        GameSearch,
        SvgaPlayer,
    },
})
export default class extends Header {
    timeClock = "";

    created() {
        setInterval(() => {
            let timezone = "";
            const defalutTimezone = GameConfig.config.defalutTimezone;
            if (defalutTimezone) {
                timezone = defalutTimezone.split(":")[0];
            } else {
                timezone = Timezone.Instance.curTimezoneItem.key?.split(":")[0];
            }
            this.timeClock = dateFormatForTimezone(GlobalVar.server_time * 1000, timezone, "MM-dd hh:mm:ss");
            this.timeClock += ` (GMT${timezone})`;
        }, 1000);
    }
}
</script>
