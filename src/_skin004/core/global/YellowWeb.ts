import GameConfig from "@/core/config/GameConfig";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import WebViewBridge from "@/core/native/WebViewBridge";
import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message_box from "@/views/dialog_message_box";
import dialog_login from "@/_skin004/views/dialog_login";
import page_game_play from "@/_skin004/views/page_game_play";
import Vue from "vue";

export default function (url: string) {
    url += "?gOrientation=2";
    if (core.user_id) {
        //@ts-ignore
        const { pornFree, pornWebsite } = GameConfig.config;
        const selfProxy: SelfProxy = getProxy(SelfProxy);

        if (selfProxy.userInfo.vip_info && selfProxy.userInfo.vip_info?.vip_level >= pornFree) {
            if (core.app_type == core.EnumAppType.WEB) {
                const gameProxy: GameProxy = getProxy(GameProxy);
                gameProxy.currGame = null;
                gameProxy.gamePreData.lastRouter = Vue.router.currentRoute.path;
                page_game_play.show(url);
            } else {
                WebViewBridge.getInstance().openBrowser(url);
            }
            // OpenLink(url);
        } else {
            const vip_progress: any = selfProxy.userInfo.vip_info?.vip_progress;
            let needExp = 0;
            for (const item of vip_progress) {
                needExp = item.next_vip_level_need_exp - item.cur_vip_level_need_exp;
            }
            dialog_message_box.alert({
                message: LangUtil(
                    "您还需{0}流水打码就可以免费观看成人视频。{1}流水是升级到{2}对应等级还需要的流水。",
                    needExp,
                    needExp,
                    pornFree
                ),
            });
        }
    } else {
        dialog_message_box.confirm({
            message: LangUtil("请您登录游戏"),
            okFun: dialog_login.show,
        });
    }
}
