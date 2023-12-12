<template src="./NavigationSports.vue.html" lang="html"></template>
<style src="./NavigationSports.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import NavigationSports from "./NavigationSports";
import NavigationItem from "../navigation_item/NavigationItem.vue";
@Component({
    components: {
        NavigationItem,
    },
})
export default class extends NavigationSports {}
</script>
