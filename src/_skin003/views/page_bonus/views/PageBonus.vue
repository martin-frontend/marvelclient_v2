<template src="./PageBonus.vue.html" lang="html"></template>
<style src="./PageBonus.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageBonus from "./PageBonus";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import Question from "@/_skin003/views/widget/question/Question.vue";

@Component({
    components: {
        Overlay,
        Question,
    },
})
export default class extends PageBonus {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
