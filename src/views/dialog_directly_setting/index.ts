import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlySettingProxy from "./proxy/DialogDirectlySettingProxy";
import DialogDirectlySetting from "./views/DialogDirectlySetting.vue";

function show(agent_user: any = null) {
    DialogMount(DialogDirectlySetting);
    const proxy: DialogDirectlySettingProxy = getProxy(DialogDirectlySettingProxy);
    proxy.pageData.bShow = true;
    if (agent_user)
    {
        proxy.api_user_var_fetch_direct_user_info(agent_user.user_id);
        //Object.assign(proxy.playerInfo, agent_user);
    }
    
}

export default { show };
