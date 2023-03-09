import GameConfig from "@/core/config/GameConfig";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";

export default class AppProxy extends puremvc.Proxy {
    static NAME = "AppProxy";


    /** 加载中 动画的显示 */
    loading = false;
    refCount = 0;
    timeHandle =0;
    setLoading(isLoad: boolean = true) {
        if (isLoad) {
            this.refCount++;
        }
        else {
            this.refCount--;
        }
        if (this.refCount < 0) {
            this.refCount = 0;
        }
        //this.loading = isLoad;
        if (this.refCount == 0 && isLoad == false) {
            clearTimeout(this.timeHandle);
            this.loading = false;
        }

        if (isLoad) {
            this.loading = true;
            this.timeHandle =  setTimeout(() => {
                console.log("自动关闭");
                this.refCount = 0;
                this.loading = false;
            }, 10000);
           
        }
    }

    /** 用户中心 */
    bshowUserPanel = false;
    setUserPanelShow(isShow:boolean)
    {
        this.bshowUserPanel = isShow;
    }

    bshowNovigationPanel = false;
    setNovigationPanelShow(isShow:boolean)
    {
        this.bshowNovigationPanel = isShow;
    }


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

        // this.guideDrawer = true;
        // return;
        //@ts-ignore
        if (window.navigator.standalone === false) {
            this.guideDrawer = true;
        } else {
            this.downloadApp(GameConfig.config.AndroidApkUrl);
        }
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
