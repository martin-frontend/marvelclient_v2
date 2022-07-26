<template>
    <v-app>
        <div id="page">
            <Header />
            <v-main>
                <router-view />
            </v-main>
            <Footer v-if="!$vuetify.breakpoint.mobile" />
            <MobileMenu v-else />
        </div>
        <DialogMessage />
        <div id="dialog_container"></div>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/_skin100/views/header/views/Header.vue";
import Footer from "@/_skin100/views/footer/Footer.vue";
import MobileMenu from "@/_skin100/views/mobile_menu/MobileMenu.vue";
import DialogMessage from "@/views/dialog_message/views/DialogMessage.vue";

@Component({
    components: {
        DialogMessage,
        Header,
        Footer,
        MobileMenu,
    },
})
export default class APP extends Vue {}
</script>
