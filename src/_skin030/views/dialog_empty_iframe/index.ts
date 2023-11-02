import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogEmptyIframeProxy from "./proxy/DialogEmptyIframeProxy";
import DialogEmptyIframe from "./views/DialogEmptyIframe.vue";

function show(data: any) {
    DialogMount(DialogEmptyIframe, false);
    const proxy: DialogEmptyIframeProxy = getProxy(DialogEmptyIframeProxy);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

export default { show };
