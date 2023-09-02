<template>
    <v-app>
        <router-view class="router_class"></router-view>
    </v-app>
</template>

<script lang="ts">
import Component from "vue-class-component";
import App from "./App";
@Component({
    components: {},
})
export default class extends App {}
</script>

<style lang="scss" scoped>
.router_class{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
