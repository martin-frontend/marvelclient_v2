<template src="./PageCoinTask.vue.html" lang="html"></template>
<style src="./PageCoinTask.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageCoinTask from "./PageCoinTask";
import ImgLoader from "@/_skin005/views/widget/img_loader/ImgLoader.vue";

@Component({
    components: {
        ImgLoader,
    },
})
export default class extends PageCoinTask {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
