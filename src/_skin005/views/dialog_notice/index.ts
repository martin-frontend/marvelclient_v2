import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNoticeProxy from "./proxy/DialogNoticeProxy";
import DialogNotice from "./views/DialogNotice.vue";
let timeId: any = null;
let firstShowNotice = true;
const proxy: DialogNoticeProxy = getProxy(DialogNoticeProxy);
function show() {
    DialogMount(DialogNotice);
    clearTimeout(timeId);
    timeId = setTimeout(
        () => {
            proxy.pageData.bShow = true;
        },
        firstShowNotice ? 1000 : 0
    );
    firstShowNotice = false;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show, hidden };
