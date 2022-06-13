import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAwardProxy from "./proxy/DialogAwardProxy";
import DialogAward from "./views/DialogAward.vue";

function show(data: any) {
    DialogMount(DialogAward);
    const proxy: DialogAwardProxy = getProxy(DialogAwardProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.data = data;
}

export default { show };
