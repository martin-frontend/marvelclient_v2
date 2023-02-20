<template src="./SoccerMatcheItem.vue.html" lang="html"></template>
<style src="./SoccerMatcheItem.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import SoccerMatcheItem from "./SoccerMatcheItem";
import BtnFixedBet from "../btn_fixed_bet/BtnFixedBet.vue"

@Component({
    components:{
        BtnFixedBet
    }
})
export default class extends SoccerMatcheItem {}
</script>
