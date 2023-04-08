import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogEditRemarkProxy from "./proxy/DialogEditRemarkProxy";
import DialogEditRemark from "./views/DialogEditRemark.vue";
const proxy: DialogEditRemarkProxy = getProxy(DialogEditRemarkProxy);

function show(data: any) {
    DialogMount(DialogEditRemark);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
