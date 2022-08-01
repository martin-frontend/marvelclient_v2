<template src="./PageExtension.vue.html" lang="html"></template>
<style src="./PageExtension.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageExtension from "./PageExtension";
import Question from "@/_skin100/views/widget/question/Question.vue";

@Component({
    components: {
        Question,
    },
})
export default class extends PageExtension {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
