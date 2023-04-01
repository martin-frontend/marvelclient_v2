import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNoticeDetailProxy from "./proxy/DialogNoticeDetailProxy";
import DialogNoticeDetail from "./views/DialogNoticeDetail.vue";

const proxy: DialogNoticeDetailProxy = getProxy(DialogNoticeDetailProxy);
function show(data:any) {
    DialogMount(DialogNoticeDetail);
    
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.data = data;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show ,hidden};
