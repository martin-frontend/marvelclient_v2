<template src="./Navigation.vue.html" lang="html"></template>
<style src="./Navigation.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import LangSelect from "./lang_select/LangSelect.vue";
import LightDark from "./light_dark/LightDark.vue";
import Navigation from "./Navigation";
import GameMenu from "./widget/game_menu/GameMenu.vue";
import User from "../header/user/User.vue";
import TimezoneSelect from "@/_skin030/views/navigation/timezone_select/TimezoneSelect.vue";
import Activity from "@/_skin030/views/navigation/activity/Activity.vue";
import navigationHome from "@/_skin030/views/navigation/widget/navigation_home/NavigationHome.vue";
import navigationCasino from "@/_skin030/views/navigation/widget/navigation_casino/NavigationCasino.vue";
import navigationSports from "@/_skin030/views/navigation/widget/navigation_sports/NavigationSports.vue";
@Component({
    components: {
        LangSelect,
        LightDark,
        GameMenu,
        User,
        TimezoneSelect,
        Activity,
        navigationHome,
        navigationCasino,
        navigationSports,
    },
})
export default class extends Navigation {}
</script>
./Navigation