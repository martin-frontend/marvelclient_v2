import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGoogleSettingsProxy from "./proxy/DialogGoogleSettingsProxy";
import DialogGoogleSettings from "./views/DialogGoogleSettings.vue";
const proxy: DialogGoogleSettingsProxy = getProxy(DialogGoogleSettingsProxy);

function show() {
    DialogMount(DialogGoogleSettings);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
