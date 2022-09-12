<template src="./TabVendorAssets.vue.html" lang="html"></template>
<style src="./TabVendorAssets.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import TabVendorAssets from "./TabVendorAssets";
import ListNodata from "@/_skin100/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        ListNodata,
    },
})
export default class extends TabVendorAssets {}
</script>
