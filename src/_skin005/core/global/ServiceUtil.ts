/*
 * @Author: custer custer@xx.xx
 * @Date: 2023-06-22 02:51:52
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-28 12:21:39
 * @FilePath: /marvelclient_v2/src/_skin005/core/global/ServiceUtil.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { urlAddParams } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import WebViewBridge from "@/core/native/WebViewBridge";

export default function (type: string = "kefu") {
    let link = "";
    switch (type) {
        case "kefu":
            // link = LangUtil("客服链接") + "?id=" + core.user_id;
            link = urlAddParams(LangUtil("客服链接"), { id: core.user_id });

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
                WebViewBridge.getInstance().openBrowser(link);
            }
            break;
        case "partner":
            // link = LangUtil("合作方链接") + "?id=" + core.user_id;
            link = urlAddParams(LangUtil("合作方链接"), { id: core.user_id });
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
                WebViewBridge.getInstance().openBrowser(link);
            }
            break;
    }
}
