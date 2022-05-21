import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogEmailDetailProxy from "./proxy/DialogEmailDetailProxy";
import DialogEmailDetail from "./views/DialogEmailDetail.vue";

function show(data: any) {
    DialogMount(DialogEmailDetail);
    const proxy: DialogEmailDetailProxy = getProxy(DialogEmailDetailProxy);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

export default { show };
