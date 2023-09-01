<template src="./DialogDailyTask.vue.html" lang="html"></template>
<style src="./DialogDailyTask.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
// import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogDailyTask from "./DialogDailyTask";

@Component({
    components: {
        // Overlay
    }
})
export default class extends DialogDailyTask {}
</script>
