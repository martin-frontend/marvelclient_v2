<template src="./PageHome.vue.html" lang="html"></template>
<style src="./PageHome.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageHome from "../views/PageHome";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import GameSlideGroup from "@/_skin004/views/widget/game_slide_group/GameSlideGroup.vue";
import RecentBetting from "@/_skin004/views/widget/recent_betting/RecentBetting.vue";
import RecentAwards from "@/_skin004/views/widget/recent_awards/RecentAwards.vue";
import Activity from "../widget/activity/Activity.vue";
import Advertise from "../widget/advertise/Advertise.vue";
import GameSport from "../widget/game_sport/GameSport.vue";
import Marquee1 from "../widget/marquee1/Marquee1.vue";
import SoccerMatche from "../widget/soccer_matche/SoccerMatche.vue";
import ProjectInfo1 from "../widget/project_info_1/ProjectInfo1.vue";
import ProjectInfo2 from "../widget/project_info_2/ProjectInfo2.vue";
import Footer from "@/_skin001/views/footer/Footer.vue";

@Component({
    components: {
        Overlay,
        GameSlideGroup,
        Advertise,
        Activity,
        GameSport,
        RecentBetting,
        RecentAwards,
        Marquee1,
        SoccerMatche,
        Footer,
        ProjectInfo1,
        ProjectInfo2,
    },
})
export default class extends PageHome {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
