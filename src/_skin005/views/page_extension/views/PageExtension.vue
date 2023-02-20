<template src="./PageExtension.vue.html" lang="html"></template>
<style src="./PageExtension.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageExtension from "./PageExtension";
import Question from "@/_skin005/views/widget/question/Question.vue";
import Fanyong from "@/_skin005/views/page_extension/views/widget/fanyong/Fanyong.vue";

@Component({
    components: {
        Question,
        Fanyong,
    },
})
export default class extends PageExtension {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
