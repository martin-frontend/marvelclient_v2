<template src="./LoadMore1.vue.html" lang="html"></template>
<style src="./LoadMore1.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import ListNodata from "@/_skin005/views/widget/list_nodata/ListNodata.vue";
import Component from "vue-class-component";
import LoadMore1 from "./LoadMore1";

@Component({
    components: {
        ListNodata,
    },
})
export default class extends LoadMore1 {}
</script>
