<template src="./PageGameList.vue.html" lang="html"></template>
<style src="./PageGameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import PageGameList from "./PageGameList";
import GameSlideGroup from "@/_skin100/views/widget/game_slide_group/GameSlideGroup.vue";
import GameItemSmall from "@/_skin100/views/widget/game_item_small/GameItem.vue";

@Component({
    components: {
        Overlay,
        GameSlideGroup,
        GameItemSmall,
    },
})
export default class extends PageGameList {
    mounted() {
        // var v_main = document.querySelector(".v-main__wrap");
        // v_main?.setAttribute("style", "background-image: linear-gradient(167deg, #4d2ba3 0%, rgba(20, 6, 115, 0) 97%);");
        // window.scrollTo(0, 0);
    }
    beforeDestroy() {
        // var v_main = document.querySelector(".v-main__wrap");
        // v_main?.removeAttribute("style");
    }
}
</script>
