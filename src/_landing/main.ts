import LandConfig from "./config/LandConfig";
import { api_public_area_code, api_public_auth_code } from "./net";

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
}

core.init();
loadConfig();
