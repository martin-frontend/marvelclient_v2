<template>
    <v-app>
        <div id="page">
            <Header />
            <v-main>
                <router-view />
            </v-main>
            <Footer />
        </div>

        <div id="dialog_container"></div>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/views/header/views/Header.vue";
import Footer from "./views/footer/views/Footer.vue";

@Component({
    components: {
        Header,
        Footer,
    },
})
export default class APP extends Vue {}
</script>
