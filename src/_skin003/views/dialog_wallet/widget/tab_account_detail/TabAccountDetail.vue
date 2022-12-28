<template src="./TabAccountDetail.vue.html" lang="html"></template>
<style src="./TabAccountDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomSelect from "@/_skin003/views/widget/custom_select/CustomSelect.vue";
import Component from "vue-class-component";
import TabAccountDetail from "./TabAccountDetail";
import ListNodata from "@/_skin003/views/widget/list_nodata/ListNodata.vue";
import LoadMore from "@/_skin003/views/widget/loadMore/LoadMore.vue";

@Component({
    components: {
        CustomSelect,
        ListNodata,
        LoadMore,
    },
})
export default class extends TabAccountDetail {}
</script>
