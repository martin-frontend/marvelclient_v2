<template src="./PageCasinoSport.vue.html" lang="html"></template>
<style src="./PageCasinoSport.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageCasinoSport from "./PageCasinoSport";
import Activity from "@/_skin030/views/page_home/widget/activity/Activity.vue";
import ImgLoader from "@/_skin030/views/widget/img_loader/ImgLoader.vue";
@Component({
    components: {
        Activity,
        ImgLoader,
    },
})
export default class extends PageCasinoSport {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
