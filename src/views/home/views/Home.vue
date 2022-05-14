<template>
    <v-container class="mt-8 pa-0">
        <Advertise />
        <Activity />
        <div v-for="item of lobbyIndex" :key="item.category">
            <GameSlideGroup :data="item" :name="item.category" :id="item.category" :bShowAll="true"/>
        </div>
        <RecentBetting class="mt-8"/>
    </v-container>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import GameSlideGroup from "@/views/widget/game_slide_group/GameSlideGroup.vue";
import Component from "vue-class-component";
import Activity from "./components/Activity.vue";
import Advertise from "./components/Advertise.vue";
import GameSport from "./components/GameSport.vue";
import RecentBetting from "./components/RecentBetting.vue";

@Component({
    components: {
        GameSlideGroup,
        Advertise,
        Activity,
        GameSport,
        RecentBetting,
    },
})
export default class Home extends AbstractView {
    private gameProxy: GameProxy = this.getProxy(GameProxy);
    private lobbyIndex: any[] = this.gameProxy.lobbyIndex;
}
</script>

<style scoped lang="scss">
@import "@/style/fontsize.scss";
</style>
