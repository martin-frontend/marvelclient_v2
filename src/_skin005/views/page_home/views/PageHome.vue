<template src="./PageHome.vue.html" lang="html"></template>
<style src="./PageHome.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageHome from "./PageHome";
import SoccerMatche from "../widget/soccer_matche/SoccerMatche.vue";
import GameSlideGroup from "../widget/game_slide_group/GameSlideGroup.vue";
import GameSport from "../widget/game_sport/GameSport.vue";
import Marquee1 from "../../widget/marquee1/Marquee1.vue";
import Category from "@/_skin005/views/page_home/widget/category/Category.vue";
import GameType from "../widget/game_type/GameType.vue";
@Component({
    components: {
        SoccerMatche,
        GameSlideGroup,
        GameSport,
        Marquee1,
        Category,
        GameType,
    },
})
export default class extends PageHome {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
