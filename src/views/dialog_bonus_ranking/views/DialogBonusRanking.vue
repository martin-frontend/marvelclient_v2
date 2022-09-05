<template src="./DialogBonusRanking.vue.html" lang="html"></template>
<style src="./DialogBonusRanking.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogBonusRanking from "./DialogBonusRanking";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        Overlay,
        ListNodata,
    },
})
export default class extends DialogBonusRanking {}
</script>
