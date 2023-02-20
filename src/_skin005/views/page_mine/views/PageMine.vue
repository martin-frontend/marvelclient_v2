<template src="./PageMine.vue.html" lang="html"></template>
<style src="./PageMine.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageMine from "./PageMine";
import Question from "@/_skin005/views/widget/question/Question.vue";




@Component({
    components: {
        Question,

    },
})
export default class extends PageMine {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
