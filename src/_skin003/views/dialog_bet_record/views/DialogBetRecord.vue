<template src="./DialogBetRecord.vue.html" lang="html"></template>
<style src="./DialogBetRecord.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import DialogBetRecord from "./DialogBetRecord";
import CustomSelect from "@/_skin003/views/widget/custom_select/CustomSelect.vue";
import ListNodata from "@/_skin003/views/widget/list_nodata/ListNodata.vue";
import CustomDatePick from "@/_skin003/views/widget/custom_date_pick/CustomDatePick.vue";
import LoadMore from "@/_skin003/views/widget/loadMore/LoadMore.vue";

@Component({
    components: {
        CustomSelect,
        Overlay,
        ListNodata,
        CustomDatePick,
        LoadMore,
    },
})
export default class extends DialogBetRecord {}
</script>
