import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageQrcodeMediator from "../mediator/PageQrcodeMediator";
import GameConfig from "@/core/config/GameConfig";
import Utils from "@/core/global/Utils";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class PageQrcode extends AbstractView {
    LangUtil = LangUtil;

    version = {
        trident: false,
        presto: false,
        webKit: false,
        gecko: false,
        mobile: false,
        ios: false,
        android: false,
        iPhone: false,
        iPad: false,
        webApp: false,
    };
    qrCode_android = null;
    qrCode_ios = null;
    public get androidUrl(): string {
        // return GameConfig.config.android_download_link;
        // return GameConfig.config.AndroidApkUrl;
        return GameConfig.config.android_download_link ? GameConfig.config.android_download_link : "https://google.com";
    }
    public get iosUrl(): string {
        // return GameConfig.config.ios_download_link;
        // return GameConfig.config.AndroidApkUrl;
        return GameConfig.config.ios_download_link ? GameConfig.config.ios_download_link : "https://google.com";
    }

    getVersion() {
        const u = navigator.userAgent,
            app = navigator.appVersion;
        this.version.trident = u.indexOf("Trident") > -1; //IE内核;
        this.version.trident = u.indexOf("Trident") > -1; //IE内核
        this.version.presto = u.indexOf("Presto") > -1; //opera内核
        this.version.webKit = u.indexOf("AppleWebKit") > -1; //苹果、谷歌内核
        this.version.gecko = u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1; //火狐内核
        this.version.mobile = !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/); //是否为移动终端
        this.version.ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        this.version.android = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
        this.version.iPhone = u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1; //是否为iPhone或者QQHD浏览器
        this.version.iPad = u.indexOf("iPad") > -1; //是否iPad
        this.version.webApp = u.indexOf("Safari") == -1; //是否web应该程序，没有头部与底部
        if (this.version.ios || this.version.iPhone || this.version.iPad) {
            window.location.href = this.iosUrl;
        } else {
            window.location.href = this.androidUrl;
        }
    }
}
