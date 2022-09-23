import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGoogleVerificationProxy from "./proxy/DialogGoogleVerificationProxy";
import DialogGoogleVerification from "./views/DialogGoogleVerification.vue";

function show(type: boolean = true) {
    DialogMount(DialogGoogleVerification);
    const proxy: DialogGoogleVerificationProxy = getProxy(DialogGoogleVerificationProxy);
    proxy.pageData.bShow = type;
}

export default { show };
