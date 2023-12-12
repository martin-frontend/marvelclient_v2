<template src="./NavigationCasino.vue.html" lang="html"></template>
<style src="./NavigationCasino.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import NavigationCasino from "./NavigationCasino";
import NavigationItem from "../navigation_item/NavigationItem.vue";
@Component({
    components: {
        NavigationItem,
    },
})
export default class extends NavigationCasino {}
</script>
