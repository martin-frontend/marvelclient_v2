import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import WebViewBridge from "@/core/native/WebViewBridge";

export default function () {
    const link = LangUtil("客服链接") + "?id=" + core.user_id;
    if (core.app_type == core.EnumAppType.WEB) {
        try {
            window.open(
                link,
                LangUtil("客服"),
                "height=680, width=680, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
            );
        } catch (e: any) {
            OpenLink(link);
        }
    } else {
        //     WebViewBridge.getInstance().openBrowser(link);
        WebViewBridge.getInstance().openStstemBrowser(link);
    }
}
