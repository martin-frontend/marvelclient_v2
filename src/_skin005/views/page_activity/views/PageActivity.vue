<template src="./PageActivity.vue.html" lang="html"></template>
<style src="./PageActivity.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageActivity from "./PageActivity";
@Component({
    components: {
    },
})
export default class extends PageActivity {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
