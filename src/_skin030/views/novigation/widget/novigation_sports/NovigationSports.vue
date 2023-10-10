<template src="./NovigationSports.vue.html" lang="html"></template>
<style src="./NovigationSports.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import NovigationSports from "./NovigationSports";
import NovigationItem from "../novigation_item/NovigationItem.vue";
@Component({
    components: {
        NovigationItem,
    },
})
export default class extends NovigationSports {}
</script>
