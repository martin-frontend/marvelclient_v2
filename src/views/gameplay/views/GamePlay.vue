<template>
    <v-container>
        <v-sheet class="rounded-lg" color="#192b4d" height="872">
            <iframe id="gameFrame" class="frame" :src="myProxy.url" allowfullscreen="true"></iframe>
            <v-btn class="mt-3 ml-5" icon @click="onFullScreen">
                <div class="iconfont icon-Expand"></div>
            </v-btn>
        </v-sheet>
        <RecentBetting class="mt-4" />
    </v-container>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import router from "@/router";
import dialog_message from "@/views/dialog_message";
import RecentBetting from "@/views/home/views/components/RecentBetting.vue";
import Component from "vue-class-component";
import GamePlayProxy from "../proxy/GamePlayProxy";
@Component({
    components: {
        RecentBetting,
    },
})
export default class GamePlay extends AbstractView {
    private myProxy: GamePlayProxy = this.getProxy(GamePlayProxy);

    mounted() {
        if (this.myProxy.url == "") {
            router.replace("/");
        } else {
            window.scrollTo(0, 0);
        }
    }

    private onFullScreen() {
        const gameFrame = document.getElementById("gameFrame");
        if (gameFrame) {
            gameFrame.requestFullscreen().catch(() => {
                dialog_message.warn("Fullscreen not supported");
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.frame {
    border: 0;
    width: 100%;
    height: 801px;
    background: #0d1525;
}
</style>
