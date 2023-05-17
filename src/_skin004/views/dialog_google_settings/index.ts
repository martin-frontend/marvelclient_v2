import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGoogleSettingsProxy from "./proxy/DialogGoogleSettingsProxy";
import DialogGoogleSettings from "./views/DialogGoogleSettings.vue";

function show() {
    DialogMount(DialogGoogleSettings);
    const proxy: DialogGoogleSettingsProxy = getProxy(DialogGoogleSettingsProxy);
    proxy.pageData.bShow = true;
}

export default { show };
