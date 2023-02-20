import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogSafetyCenterProxy from "./proxy/DialogSafetyCenterProxy";
import DialogSafetyCenter from "./views/DialogSafetyCenter.vue";
const proxy: DialogSafetyCenterProxy = getProxy(DialogSafetyCenterProxy);

function show(index:number = -1) {
    DialogMount(DialogSafetyCenter);
    hidden(false);
    proxy.pageData.tabIndex = index;
    proxy.pageData.bShow = true;
    proxy.resetForm();


}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
