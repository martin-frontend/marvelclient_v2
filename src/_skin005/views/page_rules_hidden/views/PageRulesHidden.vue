<template src="./PageRulesHidden.vue.html" lang="html"></template>
<style src="./PageRulesHidden.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageRulesHidden from "./PageRulesHidden";

@Component({
    components: {

    },
})
export default class extends PageRulesHidden {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
