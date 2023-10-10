<template src="./Novigation.vue.html" lang="html"></template>
<style src="./Novigation.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import LangSelect from "./lang_select/LangSelect.vue";
import LightDark from "./light_dark/LightDark.vue";
import Novigation from "./Novigation";
import GameMenu from "./widget/game_menu/GameMenu.vue";
import User from "../header/user/User.vue";
import TimezoneSelect from "@/_skin030/views/novigation/timezone_select/TimezoneSelect.vue";
import Activity from "@/_skin030/views/novigation/activity/Activity.vue";
import novigationHome from "@/_skin030/views/novigation/widget/novigation_home/NovigationHome.vue";
import novigationCasino from "@/_skin030/views/novigation/widget/novigation_casino/NovigationCasino.vue";
import novigationSports from "@/_skin030/views/novigation/widget/novigation_sports/NovigationSports.vue";
@Component({
    components: {
        LangSelect,
        LightDark,
        GameMenu,
        User,
        TimezoneSelect,
        Activity,
        novigationHome,
        novigationCasino,
        novigationSports,
    },
})
export default class extends Novigation {}
</script>
