<template src="./Footer.vue.html" lang="html"></template>
<style src="@/_skin005/views/footer/Footer.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Footer from "@/_skin005/views/footer/Footer";

import { dateFormatForTimezone } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import GameConfig from "@/core/config/GameConfig";
import Timezone from "@/core/Timezone";

@Component
export default class extends Footer {
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
            this.timeClock = dateFormatForTimezone(GlobalVar.server_time * 1000, timezone, "yyyy-MM-dd hh:mm:ss");
            this.timeClock += ` (GMT${timezone})`;
        }, 1000);
    }
}
</script>
