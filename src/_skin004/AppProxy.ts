import GameConfig from "@/core/config/GameConfig";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
export default class AppProxy extends puremvc.Proxy {
    static NAME = "AppProxy";

    //是否显示IOS引导
    guideDrawer = false;

    get isShowGuide() {
        //@ts-ignore
        if (core.app_type == core.EnumAppType.APP || window.navigator.standalone === true) {
            return false;
        }
        return true;
    }

    get guideText() {
        //@ts-ignore
        return LangUtil(window.navigator.standalone === undefined ? "下载APP" : "添加到桌面");
    }

    onGuide() {
        const a = window.navigator.userAgent;
        const isAndroid = a.indexOf("Android") > -1 || a.indexOf("And") > -1;
        const isIos = !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios端

        if (isAndroid) {
            this.downloadApp(GameConfig.config.android_download_link);
        } else if (isIos) {
            this.downloadApp(GameConfig.config.ios_download_link);
        } else {
            this.guideDrawer = true;
        }

        // //@ts-ignore
        // if (window.navigator.standalone === false) {
        //     this.guideDrawer = true;
        // } else {
        //     //将参数复制到剪切板
        //     const data = { code: core.invite_user_id || core.user_id, pid: core.plat_id, channel: core.channel_id };
        //     CopyUtil(JSON.stringify(data));
        //     //下载apk
        //     const src = GameConfig.config.AndroidApkUrl;
        //     const form = document.createElement("form");
        //     form.action = src;
        //     document.getElementsByTagName("body")[0].appendChild(form);
        //     form.submit();
        // }
    }
    //下载apk
    downloadApp(url: string) {
        //将参数复制到剪切板
        const data = { code: core.invite_user_id || core.user_id, pid: core.plat_id, channel: core.channel_id };
        CopyUtil(JSON.stringify(data));
        //下载apk
        const src = url;
        const form = document.createElement("form");
        form.action = src;
        document.getElementsByTagName("body")[0].appendChild(form);
        form.submit();
    }
}
