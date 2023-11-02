<template src="./PageGameSoccer.vue.html" lang="html"></template>
<style src="./PageGameSoccer.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageGameSoccer from "./PageGameSoccer";
import Activity from "@/_skin030/views/page_home/widget/activity/Activity.vue";
@Component({
    components: {
        Activity,
    },
})
export default class extends PageGameSoccer {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
