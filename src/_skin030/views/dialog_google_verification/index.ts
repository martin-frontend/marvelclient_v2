import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGoogleVerificationProxy from "./proxy/DialogGoogleVerificationProxy";
import DialogGoogleVerification from "./views/DialogGoogleVerification.vue";
const proxy: DialogGoogleVerificationProxy = getProxy(DialogGoogleVerificationProxy);

function show(type: boolean = true) {
    DialogMount(DialogGoogleVerification);
    hidden(false);
    proxy.pageData.bShow = type;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
