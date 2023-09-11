import LandConfig from "./config/LandConfig";
import { api_public_area_code, api_public_auth_code } from "./net";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "./Home.vue";
import { getVuetify } from "./plugins/vuetify";
let old_channel_id: string;

async function loadConfig() {
    await LandConfig.loadChannelConfig();
    await LandConfig.loadPlatConfig();
    old_channel_id = LandConfig.config.channelID;
    const channelID = core.getQueryVariable("channel_id");
    if (channelID) {
        const config = LandConfig.config;
        config.channelID = channelID;
    }
    loadTemplate();
}

function loadTemplate() {
    const config = LandConfig.config;
    const version = process.env.version;
    let template_url = "";
    let faviconurl = "";
    if (config.modelType == 1) {
        template_url = "template/" + config.modelID + "/index.html?v=" + version;
        faviconurl = "template/" + config.modelID + "/favicon.ico?v=" + version;
    } else {
        template_url = "template/" + old_channel_id + "/" + config.id + "/" + config.upload_version + "/index.html?v=" + version;
        faviconurl = "template/" + old_channel_id + "/" + config.id + "/" + config.upload_version + "/favicon.ico?v=" + version;
    }

    const link: any = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = faviconurl;
    document.getElementsByTagName("head")[0].appendChild(link);

    const ifr: any = document.getElementById("ifr");
    if (ifr.attachEvent) {
        ifr.attachEvent("onload", function () {
            iframeLoaded();
        });
    } else {
        ifr.onload = function () {
            iframeLoaded();
        };
    }
    ifr.setAttribute("src", template_url);
}

function iframeLoaded() {
    const ifr: any = document.getElementById("ifr");
    ifr.contentWindow.postMessage({ action: "config", params: LandConfig.config }, "*");
    api_public_auth_code();
    api_public_area_code();
    const config = LandConfig.config;
    if (config.gtmEvent) {
        //@ts-ignore
        window.initGTM(config.gtmEvent);
    }

    if (config.gtmEvent_template) {
        //@ts-ignore
        window.initGTM(config.gtmEvent_template);
    }
}

function logInit() {
    // @ts-ignore
    const compiletype = process.env.VUE_APP_ENV;
    if (compiletype === "production") {
        if (window.console) {
            const methods = ["log", "debug", "warn", "info", "group", "groupCollapsed"];
            for (let i = 0; i < methods.length; i++) {
                const c: any = console;
                c[methods[i]] = function () {};
            }
        }
    }
}

logInit();
core.init();
loadConfig();
const vuetify = getVuetify();
Vue.vuetify = vuetify;

Vue.use(VueRouter);
const routes = [
    { path: "/", component: Home },
    { path: "/signup", component: Home },
];
const router = new VueRouter({
    routes,
});
Vue.router = router;
//@ts-ignore
window["vm"] = new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
