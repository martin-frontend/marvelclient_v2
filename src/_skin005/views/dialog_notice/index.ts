import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNoticeProxy from "./proxy/DialogNoticeProxy";
import DialogNotice from "./views/DialogNotice.vue";

const proxy: DialogNoticeProxy = getProxy(DialogNoticeProxy);
function show() {
    DialogMount(DialogNotice);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show, hidden };
