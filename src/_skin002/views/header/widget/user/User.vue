<template src="./User.vue.html" lang="html"></template>
<style src="./User.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import User from "./User";
import UserPanel from "../user_panel/UserPanel.vue";

@Component({
    components: {
        UserPanel,
    },
})
export default class extends User {}
</script>
