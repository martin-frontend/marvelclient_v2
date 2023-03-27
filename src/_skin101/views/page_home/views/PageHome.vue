<template src="./PageHome.vue.html" lang="html"></template>
<style src="./PageHome.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageHome from "./PageHome";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import GameSlideGroup from "@/_skin101/views/widget/game_slide_group/GameSlideGroup.vue";
// import GameSlideGroup from "@/views/widget/game_slide_group/GameSlideGroup.vue";
import GameSlideGroupLink from "@/_skin101/views/widget/game_slide_group_link/GameSlideGroup.vue";
import RecentBetting from "@/views/widget/recent_betting/RecentBetting.vue";
import Activity from "../widget/activity/Activity.vue";
import Advertise from "../widget/advertise/Advertise.vue";
import Ag from "../widget/ag/Ag.vue";
import GameSport from "../widget/game_sport_u5/GameSport.vue";
import Marquee1 from "../widget/marquee1/Marquee1.vue";

@Component({
    components: {
        Overlay,
        GameSlideGroup,
        GameSlideGroupLink,
        Advertise,
        Activity,
        GameSport,
        RecentBetting,
        Marquee1,
        Ag,
    },
})
export default class extends PageHome {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
