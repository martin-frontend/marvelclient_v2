<template src="@/_skin004/views/page_extension/views/PageExtension.vue.html" lang="html"></template>
<style src="@/_skin004/views/page_extension/views/PageExtension.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageExtension from "./PageExtension";
import Question from "@/_skin001/views/widget/question/Question.vue";

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
