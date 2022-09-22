import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGoogleVerificationProxy from "./proxy/DialogGoogleVerificationProxy";
import DialogGoogleVerification from "./views/DialogGoogleVerification.vue";

function show() {
    DialogMount(DialogGoogleVerification);
    const proxy: DialogGoogleVerificationProxy = getProxy(DialogGoogleVerificationProxy);
    proxy.pageData.bShow = true;
}

export default { show };
