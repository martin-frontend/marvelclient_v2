import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogActivityDetailProxy from "./proxy/DialogActivityDetailProxy";
import DialogActivityDetail from "./views/DialogActivityDetail.vue";

function show(data: any) {
    DialogMount(DialogActivityDetail);
    const proxy: DialogActivityDetailProxy = getProxy(DialogActivityDetailProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.data = data;
}

export default { show };
