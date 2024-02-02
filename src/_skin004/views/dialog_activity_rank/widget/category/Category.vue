<template src="./Category.vue.html" lang="html"></template>
<style src="./Category.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Category from "./Category";
import RankCategoryItem from "@/_skin004/views/dialog_activity_rank/widget/rank_category_item/RankCategoryItem.vue";
import horizontal_scroll from "@/_skin005/views/widget/horizontal_scroll/HorizontalScroll.vue";
@Component({
    components: {
        RankCategoryItem,
        horizontal_scroll,
    },
})
export default class extends Category {}
</script>
