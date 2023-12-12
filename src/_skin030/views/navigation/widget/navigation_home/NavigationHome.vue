<template src="./NavigationHome.vue.html" lang="html"></template>
<style src="./NavigationHome.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import NavigationHome from "./NavigationHome";
import NavigationItem from "../navigation_item/NavigationItem.vue";
@Component({
    components: {
        NavigationItem,
    },
})
export default class extends NavigationHome {}
</script>
