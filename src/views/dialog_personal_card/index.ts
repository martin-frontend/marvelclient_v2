import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPersonalCardProxy from "./proxy/DialogPersonalCardProxy";
import DialogPersonalCard from "./views/DialogPersonalCard.vue";

function show() {
    DialogMount(DialogPersonalCard);
    const proxy: DialogPersonalCardProxy = getProxy(DialogPersonalCardProxy);
    proxy.pageData.bShow = true;
}

export default { show };
