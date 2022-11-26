import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogEditRemarkProxy from "./proxy/DialogEditRemarkProxy";
import DialogEditRemark from "./views/DialogEditRemark.vue";

function show(data: any) {
    DialogMount(DialogEditRemark);
    const proxy: DialogEditRemarkProxy = getProxy(DialogEditRemarkProxy);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

export default { show };
