<template src="./PageGameList.vue.html" lang="html"></template>
<style src="./PageGameList.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import PageGameList from "./PageGameList";
import GameListSelect from "../widget/game_list_select/GameListSelect.vue";
import GameSlideGroup from "@/_skin101/views/widget/game_slide_group/GameSlideGroup.vue";
import GameItemSmall from "@/_skin101/views/widget/game_item_small/GameItem.vue";

@Component({
    components: {
        Overlay,
        GameListSelect,
        GameSlideGroup,
        GameItemSmall,
    },
})
export default class extends PageGameList {
    mounted() {
        // var v_main = document.querySelector(".v-main__wrap");
        // this.$vuetify.breakpoint.xsOnly
        //     ? v_main?.setAttribute("style", "background-color: #0d1b29);")
        //     : v_main?.setAttribute("style", "background-image: linear-gradient(150deg, #4f2aa7 -10%, #0d1b29 97%);");
        window.scrollTo(0, 0);
    }
    beforeDestroy() {
        // var v_main = document.querySelector(".v-main__wrap");
        // v_main?.removeAttribute("style");
    }
}
</script>
