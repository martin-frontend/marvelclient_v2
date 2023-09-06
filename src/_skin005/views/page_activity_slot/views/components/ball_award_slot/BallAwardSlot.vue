<template src="./BallAwardSlot.vue.html" lang="html"></template>
<style src="./BallAwardSlot.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import BallAwardSlot from "./BallAwardSlot";
import TurnItem from "../../widget/turn_item/TurnItem.vue";
import ArtNumber from "../../widget/art_number/ArtNumber.vue";
@Component({
    components: {
        TurnItem,
        ArtNumber,
    },
})
export default class extends BallAwardSlot {}
</script>
