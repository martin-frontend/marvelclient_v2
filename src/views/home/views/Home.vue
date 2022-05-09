<template>
    <v-container class="mt-8 pa-0">
        <Advertise />
        <Activity />
        <div v-for="item of lobbyIndex" :key="item.category">
            <GameGroup :data="item" :name="item.category" :id="item.category" />
        </div>
        <!-- <GameGroup
            v-for="item of lobbyIndex"
            :key="item.category"
            :data="item"
            :name="item.category"
            :id="item.category"
        /> -->
        <!-- <GameGroup title="真人游戏" />
        <GameGroup title="百家乐" />
        <GameSport title="体育投注"/>
        <GameGroup title="新游戏" /> -->
        <RecentBetting />
    </v-container>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import Component from "vue-class-component";
import Activity from "./components/Activity.vue";
import Advertise from "./components/Advertise.vue";
import GameGroup from "./components/GameGroup.vue";
import GameSport from "./components/GameSport.vue";
import RecentBetting from "./components/RecentBetting.vue";

@Component({
    components: {
        Advertise,
        Activity,
        GameGroup,
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
