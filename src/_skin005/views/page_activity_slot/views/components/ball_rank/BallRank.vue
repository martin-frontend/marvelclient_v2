<template src="./BallRank.vue.html" lang="html"></template>
<style src="./BallRank.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import BallRank from "./BallRank";
import SingleBall from '@/_skin005/views/page_activity_slot/views/widget/single_ball/SingleBall.vue'
@Component({
    components: {
        SingleBall,
    },
})
export default class extends BallRank {}
</script>
