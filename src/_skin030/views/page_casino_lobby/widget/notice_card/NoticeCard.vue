<template src="./NoticeCard.vue.html" lang="html"></template>
<style src="./NoticeCard.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import NoticeCard from "./NoticeCard";
import horizontal_scroll from "@/_skin030/views/widget/horizontal_scroll/HorizontalScroll.vue";
@Component({
    components: {
        horizontal_scroll,
    },
})
export default class extends NoticeCard {
    mounted() {
        this.onChange();
    }
}
</script>
