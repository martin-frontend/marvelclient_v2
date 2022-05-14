<template>
    <v-app>
        <div id="page">
            <Header />
            <v-main>
                <router-view />
            </v-main>
            <Footer />
        </div>
        <!-- 其它全局弹窗页 -->
        <!-- <DialogMessage />
        <DialogMessageBox />
        <DialogGetVerity />
        <ServiceDialog />
        <ContactDialog /> -->

        <div id="dialog_container"></div>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/views/header/views/Header.vue";
import Footer from "./views/footer/views/Footer.vue";
// import ServiceDialog from "./views/others/views/ServiceDialog.vue";
// import ContactDialog from "./views/others/views/ContactDialog.vue";
// import DialogMessage from "./views/common/view/DialogMessage.vue";
// import DialogMessageBox from "./views/common/view/DialogMessageBox.vue";
// import DialogGetVerity from "./views/common/view/DialogGetVerity.vue";

@Component({
    components: {
        // DialogMessage,
        // DialogMessageBox,
        // DialogGetVerity,
        Header,
        Footer,
        // ServiceDialog,
        // ContactDialog,
    },
})
export default class APP extends Vue {}
</script>
