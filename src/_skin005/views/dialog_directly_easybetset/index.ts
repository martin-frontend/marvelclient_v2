import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyEasybetsetProxy from "./proxy/DialogDirectlyEasybetsetProxy";
import DialogDirectlyEasybetset from "./views/DialogDirectlyEasybetset.vue";
const proxy: DialogDirectlyEasybetsetProxy = getProxy(DialogDirectlyEasybetsetProxy);

function show(agent_user: any = null, isGlobalSettings: boolean = false) {
    DialogMount(DialogDirectlyEasybetset);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.isGlobalSettings = isGlobalSettings;
    proxy.setData(agent_user);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
