<template src="./GameSlideGroup.vue.html" lang="html"></template>
<style src="./GameSlideGroup.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameItem from "../game_item_small/GameItem.vue";
import GameSlideGroup from "./GameSlideGroup";

@Component({
    components: {
        GameItem,
    },
})
export default class extends GameSlideGroup {
    mounted() {
        this.data.list.forEach((item: any) => {
            if (item.vendor_product_id == 7678) {
                this.crazyItem = item;
            }
        });
        this.dataEight = this.data.list.slice(0, 8);
        this.dataSix = this.data.list.slice(0, 6);
    }
}
</script>
