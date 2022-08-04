<template src="./PageGamePlay.vue.html" lang="html"></template>
<style src="./PageGamePlay.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageGamePlay from "./PageGamePlay";
import router from "@/_skin100/router";
import RecentBetting from "@/_skin100/views/widget/recent_betting/RecentBetting.vue";

@Component({
    components: {
        RecentBetting,
    },
})
export default class extends PageGamePlay {
    mounted() {
        if (this.pageData.url == "") {
            router.replace("/");
        }
        window.scrollTo(0, 0);
    }
}
</script>
