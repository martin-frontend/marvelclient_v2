import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyBackwaterProxy from "./proxy/DialogDirectlyBackwaterProxy";
import DialogDirectlyBackwater from "./views/DialogDirectlyBackwater.vue";

function show(agent_user: any = null) {
    DialogMount(DialogDirectlyBackwater);
    const proxy: DialogDirectlyBackwaterProxy = getProxy(DialogDirectlyBackwaterProxy);
    proxy.pageData.bShow = true;
    proxy.setData(agent_user);
}

export default { show };
