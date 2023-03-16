<template src="./DialogGoldWater.vue.html" lang="html"></template>
<style src="./DialogGoldWater.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogGoldWater from "./DialogGoldWater";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";
import LoadMore from "@/views/widget/loadMore/LoadMore.vue";
@Component({
    components: {
        ListNodata,
        LoadMore
    }
})
export default class extends DialogGoldWater { }
</script>
