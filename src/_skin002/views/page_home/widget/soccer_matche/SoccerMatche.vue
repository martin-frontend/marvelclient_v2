<template src="./SoccerMatche.vue.html" lang="html"></template>
<style src="./SoccerMatche.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import SoccerMatche from "@/_skin001/views/page_home/widget/soccer_matche/SoccerMatche";
import SoccerMatcheItem from "../soccer_matche_item/SoccerMatcheItem.vue"

@Component({
    components:{
        SoccerMatcheItem
    }
})
export default class extends SoccerMatche {}
</script>
