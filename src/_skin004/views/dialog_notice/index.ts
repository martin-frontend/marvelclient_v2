import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNoticeProxy from "./proxy/DialogNoticeProxy";
import DialogNotice from "./views/DialogNotice.vue";
let timeId: any = null;
let firstShowNotice = true;
function show() {
    DialogMount(DialogNotice);
    const proxy: DialogNoticeProxy = getProxy(DialogNoticeProxy);
    clearTimeout(timeId)
    timeId = setTimeout(() => {
        proxy.pageData.bShow = true;
    }, firstShowNotice ? 8000 : 0);
    firstShowNotice = false;
}

export default { show };
