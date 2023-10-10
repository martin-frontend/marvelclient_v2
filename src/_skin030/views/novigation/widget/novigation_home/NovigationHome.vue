<template src="./NovigationHome.vue.html" lang="html"></template>
<style src="./NovigationHome.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import NovigationHome from "./NovigationHome";
import NovigationItem from "../novigation_item/NovigationItem.vue";
@Component({
    components: {
        NovigationItem,
    },
})
export default class extends NovigationHome {}
</script>
