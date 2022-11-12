import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyEasybetsetProxy from "./proxy/DialogDirectlyEasybetsetProxy";
import DialogDirectlyEasybetset from "./views/DialogDirectlyEasybetset.vue";

function show(agent_user: any = null) {
    DialogMount(DialogDirectlyEasybetset);
    const proxy: DialogDirectlyEasybetsetProxy = getProxy(DialogDirectlyEasybetsetProxy);
    proxy.pageData.bShow = true;
    proxy.setData(agent_user);
}

export default { show };
