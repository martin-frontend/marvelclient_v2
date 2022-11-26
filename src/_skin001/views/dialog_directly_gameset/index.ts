import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyGamesetProxy from "./proxy/DialogDirectlyGamesetProxy";
import DialogDirectlyGameset from "./views/DialogDirectlyGameset.vue";

function show(data: any = null) {
    DialogMount(DialogDirectlyGameset);
    const proxy: DialogDirectlyGamesetProxy = getProxy(DialogDirectlyGamesetProxy);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

export default { show };
