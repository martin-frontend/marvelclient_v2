<template src="./Category.vue.html" lang="html"></template>
<style src="./Category.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Category from "./Category";
import GameItem from "@/_skin005/views/page_game_list/widget/game_item/GameItem.vue";
@Component({
    components: {
        GameItem,
    },
})
export default class extends Category {}
</script>
