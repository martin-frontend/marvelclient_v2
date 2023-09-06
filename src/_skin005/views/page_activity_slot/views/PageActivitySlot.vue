<template src="./PageActivitySlot.vue.html" lang="html"></template>
<style src="./PageActivitySlot.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageActivitySlot from "./PageActivitySlot";
import BallAwardSlot from "@/_skin005/views/page_activity_slot/views/components/ball_award_slot/BallAwardSlot.vue";
import BallRank from "@/_skin005/views/page_activity_slot/views/components/ball_rank/BallRank.vue";
import PoolTitleMarquee from "@/_skin005/views/page_activity_slot/views/components/pool_title_marquee/PoolTitleMarquee.vue";
import AudioNode from "@/_skin005/views/page_activity_slot/views/widget/audio_node/AudioNode.vue";
@Component({
    components: {
        BallAwardSlot,
        BallRank,
        PoolTitleMarquee,
        AudioNode,
    },
})
export default class extends PageActivitySlot {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
