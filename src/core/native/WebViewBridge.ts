import router from "@/router";
import GlobalVar from "../global/GlobalVar";
// import SoundManager from "../global/SoundManager";

import NativeEventType from "./NativeEventType";
import AudioPlayerProxy from "@/_skin004/views/widget/audio_player/AudioPlayerProxy";
import getProxy from "@/core/global/getProxy";
import { sendPostMessage } from "../global/Functions";

export enum H2NType {
    SYSTEM_INFO, //设备系统信息
    CLIENT_VERSION_DESC, //获取壳的版本号
    WEIXIN_CHECK, //检查微信
    WEIXIN_LOGIN, //微信登陆
    WEIXIN_SHARE_TEXT, //微信分享文字
    WEIXIN_SHARE_IMAGE, //微信分享图片
    CLOSE_APP, //关闭app
    ENTER_HALL_ALREADY, //通知壳已经进入到大厅了隐藏客服按钮
    GET_DEVICE_INFO, //获取设备平台信息
    OPEN_BROWSER, //应用内打开外部网页
    OPEN_QQ, //打开QQ
    OPEN_WEIXIN, //打开微信
    QUICK_PAY, //专享快付
    COPY_CLIPBOARD, //复制到剪切板
    SAVE_PHOTO, //保存图片到相册
    OPEN_ALIPAY, //打开支付宝
    OPEN_BROWSER_SYSTEM, //系统浏览器打开外部网页
    APPSFLYER_LOG, //appsflyer打点
    FACEBOOK_LOG, //appsflyer打点
}
export enum N2HType {
    ANDROID_BACK, //Android设备返回按钮
    APP_PAUSE, //activity即将关闭不可用状态
    APP_RESUME, //activity重新打开处于可见状态
    WEIXIN_LOGIN_END, //微信登陆成功
}

export default class WebViewBridge extends puremvc.Proxy {
    private static BIGDATA_BEGIN = "BIGDATA_BEGIN";
    private static BIGDATA_ING = "BIGDATA_ING";
    private static BIGDATA_END = "BIGDATA_END";

    private static instance: WebViewBridge;

    constructor() {
        super("WebViewBridge");
    }

    public static getInstance(): WebViewBridge {
        if (!this.instance) {
            this.instance = new WebViewBridge();
        }
        return this.instance;
    }

    // private bSoundOpen: boolean;      //是否通过壳关闭音乐
    public receiveNative(type: number, msg: any) {
        console.log(">>>>>>>>>>>>>>>receiveNative: " + type);
        const audioProxy: AudioPlayerProxy = getProxy(AudioPlayerProxy);

        try {
            msg = JSON.parse(msg);
        } catch (e) {
            console.log(">>>>> receiveNative error");
        }
        switch (type) {
            case N2HType.ANDROID_BACK:
                audioProxy.isBackgroundPlaying = true;
                //也没有必要处理返回按钮消息
                // WebViewBridge.getInstance().sendNotification(NativeEventType.ANDROID_BACK);
                router.back();
                sendPostMessage({ methodName: "showTab" });
                break;
            case N2HType.APP_PAUSE:
                audioProxy.isBackgroundPlaying = false;
                // SoundManager.getInstance().clearMusic();
                break;
            case N2HType.APP_RESUME:
                audioProxy.isBackgroundPlaying = true;
                // puremvc.Facade.getInstance().sendNotification(net.HttpType.api_user_show_var, {
                //     user_id: core.user_id,
                //     modules: 2,
                //     hideWaiting: true,
                // });

                // if(GlobalVar.b_page_click && GlobalVar.b_music_loaded){
                //     SoundManager.getInstance().clearMusic();
                //     SoundManager.getInstance().setMusic(GlobalVar.background_music);
                // }

                // //进入大厅通知壳js还是活着的，如果Java没有更新没有响应这个通知，会卡死大厅
                // WebViewBridge.getInstance().sendNative(H2NType.APP_CALLBACK,null,null);
                break;
        }
    }

    public sendNative(type: H2NType, data: any, callback?: any) {
        const msg = {
            type: type,
            data: data,
        };

        const msgStr = JSON.stringify(msg);

        if (msgStr.length > 4000) {
            //如果传输的数据太大，需要拆分后上传
            const count = Math.ceil(msgStr.length / 4000);
            for (let i = 0; i < count; i++) {
                let c = i == 0 ? WebViewBridge.BIGDATA_BEGIN : WebViewBridge.BIGDATA_ING;
                c += msgStr.substr(4000 * i, 4000);
                // console.log("call native: " + c);
                prompt(c);
            }
            const r = prompt(WebViewBridge.BIGDATA_END);
            console.log("sendNative.callback =", r);

            if (callback) callback(r);
            this.sendNotification(NativeEventType.NATIVE_EVENT, { type, result: r });
        } else {
            console.log("call native: " + msgStr);
            const result = prompt(msgStr);
            console.log("sendNative.callback.result =", result);
            if (callback) callback(result);
            this.sendNotification(NativeEventType.NATIVE_EVENT, { type, result });
        }
    }

    //初始化微信SDK
    public weixinCheck(callback: any) {
        console.log("检测是否有微信");
        this.sendNative(H2NType.WEIXIN_CHECK, null, callback);
    }
    //微信登录
    public weixinLogin(callback: any) {
        console.log("微信登录");
        this.sendNative(H2NType.WEIXIN_LOGIN, null, callback);
    }
    //微信分享文字
    public weixinShareText(text: string, scene: number, callback: Function) {
        console.log("微信分享文字");
        const data = {
            text: text,
            scene: scene,
        };
        this.sendNative(H2NType.WEIXIN_SHARE_TEXT, data, callback);
    }
    //微信分享图片
    public weixinShareImage(image_url: string, title: string, description: string, scene: number, callback: Function) {
        console.log("微信分享图片");
        const data = {
            text: image_url,
            title: title,
            description: description,
            scene: scene,
        };
        this.sendNative(H2NType.WEIXIN_SHARE_IMAGE, data, callback);
    }
    //关闭应用
    public closeApp() {
        console.log("关闭应用");
        this.sendNative(H2NType.CLOSE_APP, null, null);
    }

    //获取系统
    public systemInfo(callback: any) {
        console.log("获取系统");
        this.sendNative(H2NType.SYSTEM_INFO, null, callback);
    }
    //获取设备平台信息
    public getDeviceInfo(callback: any) {
        console.log("获取设备平台信息");
        this.sendNative(H2NType.GET_DEVICE_INFO, null, callback);
    }
    /** 应用内打开网页，如打开游戏的方式 */
    public openBrowser(url: string) {
        console.log("打开网址", url);
        const data = {
            url: url,
        };
        this.sendNative(H2NType.OPEN_BROWSER, data, null);
    }
    /** 使用系统浏览器应用打开网页 */
    public openStstemBrowser(url: string) {
        console.log("系统浏览器打开网址", url);
        const data = {
            url: url,
        };
        this.sendNative(H2NType.OPEN_BROWSER_SYSTEM, data, null);
    }
    //打开QQ
    public openQQ(callback: Function) {
        console.log("打开QQ");
        this.sendNative(H2NType.OPEN_QQ, null, callback);
    }
    //打开微信
    public openWeixin(callback: Function) {
        console.log("打开微信");
        this.sendNative(H2NType.OPEN_WEIXIN, null, callback);
    }
    //复制到剪切板
    public copyClipboard(text: string, callback?: any) {
        console.log("复制到剪切板");
        const data = {
            text: text,
        };
        this.sendNative(H2NType.COPY_CLIPBOARD, data, callback);
    }
    //保存图片到相册
    public savePhoto(url: string, callback?: Function) {
        console.log("保存图片到相册");
        const data = {
            url: url,
        };
        this.sendNative(H2NType.SAVE_PHOTO, data, callback);
    }
    //专享快付
    public quickPay(data: any) {
        console.log("专享快付", data);
        this.sendNative(H2NType.QUICK_PAY, data, null);
    }
    //打开支付宝
    public openAlipay(callback?: Function) {
        console.log("打开支付宝");
        this.sendNative(H2NType.OPEN_ALIPAY, null, callback);
    }

    //获得当前壳的版本号描述
    public clientVersionDesc(): string {
        let versionDesc: string = "V-TEST";
        this.sendNative(H2NType.CLIENT_VERSION_DESC, null, (data: any) => {
            if (data) {
                data = JSON.parse(data);

                versionDesc = data.versionDesc;
            }
        });
        return versionDesc;
    }

    /** 通知壳已经进入大厅了，关闭客服按钮 */
    public enterHall() {
        console.log("通知进入大厅完成。。。。");
        this.sendNative(H2NType.ENTER_HALL_ALREADY, null, null);
    }
    /**applays打点 */
    public flyerLog(data: any) {
        console.warn(">>>>>>flyerLog: ", data);
        this.sendNative(H2NType.APPSFLYER_LOG, data, null);
    }
    /**facebook打点 */
    public facebookLog(data: any) {
        console.warn(">>>>>>facebookLog: ", data);
        this.sendNative(H2NType.FACEBOOK_LOG, data, null);
    }
}
