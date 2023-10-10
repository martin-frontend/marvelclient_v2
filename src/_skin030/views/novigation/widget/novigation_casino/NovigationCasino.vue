<template src="./NovigationCasino.vue.html" lang="html"></template>
<style src="./NovigationCasino.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import NovigationCasino from "./NovigationCasino";
import NovigationItem from "../novigation_item/NovigationItem.vue";
@Component({
    components: {
        NovigationItem,
    },
})
export default class extends NovigationCasino {}
</script>
