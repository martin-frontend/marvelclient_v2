<template src="./Novigation.vue.html" lang="html"></template>
<style src="./Novigation.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import LangSelect from "./lang_select/LangSelect.vue";
import LightDark from "./light_dark/LightDark.vue";
import Novigation from "./Novigation";
import GameMenu from "./widget/game_menu/GameMenu.vue";
import User from "../header/user/User.vue";
import TimezoneSelect from "@/_skin005/views/novigation/timezone_select/TimezoneSelect.vue";
import Activity from "@/_skin005/views/novigation/activity/Activity.vue";
@Component({
    components: {
        LangSelect,
        LightDark,
        GameMenu,
        User,
        TimezoneSelect,
        Activity,
    },
})
export default class extends Novigation {}
</script>
