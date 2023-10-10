import Vue from "vue";
import LogUtil from "@/core/global/LogUtil";
import PayRediret from "./PayRediret.vue";
import GameConfig from "@/core/config/GameConfig";
import LangConfig from "@/core/config/LangConfig";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import NotificationName from "@/core/NotificationName";
import CheckSpeedCMD from "./core/command/CheckSpeedCMD";
import GlobalVar from "@/core/global/GlobalVar";
import { getVersion } from "@/core/global/Functions";

LogUtil.init();
core.init();
//@ts-ignore
core.plat_id = core.channel_id = undefined;
core.game_domain = process.env.NODE_ENV == "production" && process.env.VUE_APP_ENV != "h5" ? location.host : "skin001.testjj9.com";
//core.game_domain =  "96in.com";

Vue.config.productionTip = false;

core.lang = core.getQueryVariable("lang") || "en_EN";
//版本号
core.version_str = getVersion();
core.version = new Date(getVersion()).getTime();
if (process.env.VUE_APP_ENV == "development") {
    core.version *= 2;
}
GameConfig.load().then(() => {
    LangConfig.load().then(() => {
        //@ts-ignore
        window["vm"] = new Vue({
            render: (h) => h(PayRediret),
        }).$mount("#app");
    });
});

const facade = puremvc.Facade.getInstance();
facade.registerCommand(NotificationName.CHECK_SPEED, CheckSpeedCMD);
//五分钟检测一次网络
setInterval(() => {
    if (GlobalVar.host_urls) facade.sendNotification(NotificationName.CHECK_SPEED);
}, 300000);
