<template src="./DialogBankcardInfo.vue.html" lang="html"></template>
<style src="./DialogBankcardInfo.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogBankcardInfo from "./DialogBankcardInfo";
import ListNodata from "@/_skin101/views/widget/list_nodata/ListNodata.vue";
// import LoadMore from "@/_skin101/views/widget/loadMore/LoadMore.vue";
@Component({
    components: {
        Overlay,
        ListNodata,
        // LoadMore,
    },
})
export default class extends DialogBankcardInfo {}
</script>
