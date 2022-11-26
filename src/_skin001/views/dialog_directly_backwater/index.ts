import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyBackwaterProxy from "./proxy/DialogDirectlyBackwaterProxy";
import DialogDirectlyBackwater from "./views/DialogDirectlyBackwater.vue";
import SelfProxy from "@/proxy/SelfProxy";

function show(agent_user: any = null, ismine: boolean = false) {
    DialogMount(DialogDirectlyBackwater);
    const proxy: DialogDirectlyBackwaterProxy = getProxy(DialogDirectlyBackwaterProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.bisMine = ismine;

    if (agent_user) proxy.setData(agent_user);
    else {
        const selfProxy: SelfProxy = getProxy(SelfProxy);
        proxy.playerInfo.parent_water_config = JSON.parse(JSON.stringify(selfProxy.userInfo.water_config));
        proxy.playerInfo.water_config = JSON.parse(JSON.stringify(selfProxy.userInfo.water_config));
    }
}

export default { show };
