import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import PageExtensionProxy from "../page_extension/proxy/PageExtensionProxy";
import DialogPreviewProxy from "./proxy/DialogPreviewProxy";
import DialogPreview from "./views/DialogPreview.vue";

function show(type: any) {
    DialogMount(DialogPreview);
    const proxy: DialogPreviewProxy = getProxy(DialogPreviewProxy);
    const extensionProxy: PageExtensionProxy = getProxy(PageExtensionProxy);


    proxy.pageData.bShow = true;
    proxy.pageData.qrLink = proxy.pageData.link;
    proxy.pageData.type = type;
    if (type) {
        proxy.pageData.pretty_user_id = extensionProxy.pageData.promotionData.pretty_user_id;
        proxy.pageData.user_id = extensionProxy.pageData.promotionData.user_id;
        proxy.savePoster(proxy.pageData.qrLink)
    }
}

export default { show };
