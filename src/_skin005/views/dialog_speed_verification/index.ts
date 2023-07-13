import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogSpeedVerificationProxy from "./proxy/DialogSpeedVerificationProxy";
import DialogSpeedVerification from "./views/DialogSpeedVerification.vue";
const proxy: DialogSpeedVerificationProxy = getProxy(DialogSpeedVerificationProxy);
function show(successFun: Function | null, failFun: Function | null = null, verification: number = 0) {
    DialogMount(DialogSpeedVerification);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.successCallback = successFun;
    proxy.pageData.failCallback = failFun;
    proxy.pageData.verification = verification;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
