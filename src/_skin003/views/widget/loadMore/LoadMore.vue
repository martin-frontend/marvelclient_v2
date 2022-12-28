<template src="./LoadMore.vue.html" lang="html"></template>
<style src="./LoadMore.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import LoadMore from "./LoadMore";
import ListNodata from "@/_skin003/views/widget/list_nodata/ListNodata.vue";

@Component({
    components: {
        ListNodata,
    },
})
export default class extends LoadMore {}
</script>
