<template src="./TabAccountDetail.vue.html" lang="html"></template>
<style src="./TabAccountDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import Component from "vue-class-component";
import TabAccountDetail from "./TabAccountDetail";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        CustomSelect,
        ListNodata,
    },
})
export default class extends TabAccountDetail {}
</script>
