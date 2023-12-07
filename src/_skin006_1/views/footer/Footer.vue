<template src="./Footer.vue.html" lang="html"></template>
<style src="@/_skin005/views/footer/Footer.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Footer from "@/_skin005/views/footer/Footer";

import { dateFormatForTimezone } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class extends Footer {
    timezone = GameConfig.config.defalutTimezone.split(":")[0];
    timeClock = "";

    created() {
        setInterval(() => {
            this.timeClock = dateFormatForTimezone(GlobalVar.server_time * 1000, parseInt(this.timezone), "yyyy-MM-dd hh:mm:ss");
            this.timeClock += ` (GMT${this.timezone})`;
        }, 1000);
    }
}
</script>
