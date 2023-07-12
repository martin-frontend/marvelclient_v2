<template src="./PageGameSoccer.vue.html" lang="html"></template>
<style src="./PageGameSoccer.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageGameSoccer from "./PageGameSoccer";
import Advertise from "@/_skin005/views/page_home/widget/advertise/Advertise.vue";
@Component({
    components: {
        Advertise,
    },
})
export default class extends PageGameSoccer {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
