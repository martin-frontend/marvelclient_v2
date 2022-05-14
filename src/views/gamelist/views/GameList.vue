<template>
    <v-container id="gamelist" class="pa-0">
        <GameSlideGroup v-if="hotGame.category == 1" :data="hotGame" />
        <v-sheet class="rounded-lg mt-5 d-flex align-center px-3 py-3" color="colorTitleBg" height="80">
            <GameType />
            <v-spacer />
            <GameSearch />
            <GameVendorType />
        </v-sheet>
        <v-card class="d-flex flex-wrap mt-7" color="transparent" flat tile>
            <div v-for="item of gameData.list" :key="item.vendor_prodcut_id">
                <GameItem :item="item" />
            </div>
        </v-card>
        <div class="d-flex justify-center" v-if="gameData.pageInfo.pageCurrent < gameData.pageInfo.pageCount">
            <div class="d-flex flex-column justify-center align-center">
                <div class="mb-3" style="color: #ffffff66">
                    正显示 {{ gameData.pageInfo.pageTotal }}个游戏中的 {{ gameData.pageInfo.pageSize * gameData.pageInfo.pageCurrent }} 个
                </div>
                <v-progress-linear
                    :value="(gameData.pageInfo.pageCurrent / gameData.pageInfo.pageCount) * 100"
                    height="2"
                ></v-progress-linear>
                <v-btn class="rounded-pill my-5" color="colorBtnBg" width="196" height="40" @click="getMore">加载更多</v-btn>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import GameSearch from "./components/GameSearch.vue";
import GameType from "./components/GameType.vue";
import GameVendorType from "./components/GameVendorType.vue";
import GameListMediator from "../mediator/GameListMediator";
import GameListProxy from "../proxy/GameListProxy";
import GameSlideGroup from "@/views/widget/game_slide_group/GameSlideGroup.vue";
import GameItem from "@/views/widget/game_item/GameItem.vue";
@Component({
    components: {
        GameSlideGroup,
        GameItem,
        GameType,
        GameSearch,
        GameVendorType,
    },
})
export default class GameList extends AbstractView {
    constructor() {
        super(GameListMediator);
    }

    mounted() {
        window.scrollTo(0, 0);
    }

    private myProxy: GameListProxy = this.getProxy(GameListProxy);
    private hotGame = this.myProxy.hotGame;
    private gameData = this.myProxy.gameData;
    private listQuery = this.myProxy.listQuery;

    private getMore() {
        this.listQuery.page_count++;
        this.myProxy.api_plat_var_game_all_index();
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/input.scss";
</style>
