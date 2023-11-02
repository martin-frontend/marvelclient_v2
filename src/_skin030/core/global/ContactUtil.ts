import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import WebViewBridge from "@/core/native/WebViewBridge";

export default function ContactUtil(key = "联系我们内容") {
    const link = LangUtil(key);
    if (core.app_type == core.EnumAppType.WEB) {
        try {
            window.open(
                link,
                "_blank",
                "height=680, width=680, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
            );
        } catch (e: any) {
            OpenLink(link);
        }
    } else {
        WebViewBridge.getInstance().openBrowser(link);
    }
}
