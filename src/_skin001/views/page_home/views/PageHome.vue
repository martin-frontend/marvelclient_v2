<template src="./PageHome.vue.html" lang="html"></template>
<style src="./PageHome.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageHome from "../views/PageHome";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import GameSlideGroup from "../../../views/widget/game_slide_group/GameSlideGroup.vue";
// import RecentBetting from "@/views/widget/recent_betting/RecentBetting.vue";
import Activity from "../widget/activity/Activity.vue";
import Advertise from "../widget/advertise/Advertise.vue";
import GameSport from "../widget/game_sport/GameSport.vue";
import Marquee1 from "../widget/marquee1/Marquee1.vue";
import SoccerMatche from "../widget/soccer_matche/SoccerMatche.vue";
import Footer from "../../../views/footer/Footer.vue";

@Component({
    components: {
        Overlay,
        GameSlideGroup,
        Advertise,
        Activity,
        GameSport,
        // RecentBetting,
        Marquee1,
        SoccerMatche,
        Footer,
    },
})
export default class extends PageHome {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
