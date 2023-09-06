<template src="./PoolTitleMarquee.vue.html" lang="html"></template>
<style src="./PoolTitleMarquee.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PoolTitleMarquee from "./PoolTitleMarquee";
import ArtNumber from "../../widget/art_number/ArtNumber.vue";
@Component({
    components: {
        ArtNumber,
    },
})
export default class extends PoolTitleMarquee {}
</script>
