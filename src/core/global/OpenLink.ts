import WebViewBridge from "../native/WebViewBridge";

export default function OpenLink(url: string) {
    if (core.app_type == core.EnumAppType.APP) {
        WebViewBridge.getInstance().openStstemBrowser(url);
    } else {
        // try {
        //     const winHandler: any = window.open("", "_blank");
        //     winHandler.location.href = url;
        // } catch (e) {
        const a = document.createElement("a"); //创建a标签
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        document.body.appendChild(a);
        a.click(); //执行当前对象
        // }
    }
}
