import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNoticeProxy from "./proxy/DialogNoticeProxy";
import DialogNotice from "./views/DialogNotice.vue";

function show() {
    DialogMount(DialogNotice);
    const proxy: DialogNoticeProxy = getProxy(DialogNoticeProxy);
    proxy.pageData.bShow = true;
}

export default { show };
