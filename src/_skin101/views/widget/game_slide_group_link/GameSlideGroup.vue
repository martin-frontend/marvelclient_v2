<template src="./GameSlideGroup.vue.html" lang="html"></template>
<style src="./GameSlideGroup.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameItem from "../game_item_small/GameItem.vue";
import GameSlideGroup from "./GameSlideGroup";
// import GameSlideGroupNatvie from "../game_slide_group/GameSlideGroup.vue";

@Component({
    components: {
        GameItem,
        // GameSlideGroupNatvie,
    },
})
export default class extends GameSlideGroup {
    mounted() {
        this.data.list.forEach((item: any) => {
            // console.log("itemtst", item);
            // if (item.vendor_product_id == 7678) {
            if (
                item.vendor_product_name == "疯狂竞拍" ||
                item.vendor_product_name == "Crazy bidding" ||
                item.vendor_product_name == "瘋狂競拍"
            ) {
                this.crazyItem = item;
            }
        });
        this.dataEight = this.data.list.slice(0, 8);
        this.dataSix = this.data.list.slice(0, 6);
    }
}
</script>
