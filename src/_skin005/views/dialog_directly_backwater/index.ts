import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import DialogDirectlyBackwaterProxy from "./proxy/DialogDirectlyBackwaterProxy";
import DialogDirectlyBackwater from "./views/DialogDirectlyBackwater.vue";

const proxy: DialogDirectlyBackwaterProxy = getProxy(DialogDirectlyBackwaterProxy);

function show(agent_user: any = null, ismine: boolean = false) {
    DialogMount(DialogDirectlyBackwater);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.bisMine = ismine;

    if (agent_user) proxy.setData(agent_user);
    else {
        const selfProxy = PanelUtil.getProxy_selfproxy;
        proxy.playerInfo.parent_water_config = JSON.parse(JSON.stringify(selfProxy.userInfo.water_config));
        proxy.playerInfo.water_config = JSON.parse(JSON.stringify(selfProxy.userInfo.water_config));
    }
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
