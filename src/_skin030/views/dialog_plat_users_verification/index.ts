import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPlatUsersVerificationProxy from "./proxy/DialogPlatUsersVerificationProxy";
import DialogPlatUsersVerification from "./views/DialogPlatUsersVerification.vue";
const proxy: DialogPlatUsersVerificationProxy = getProxy(DialogPlatUsersVerificationProxy);

function show() {
    DialogMount(DialogPlatUsersVerification);
    proxy.pageData.bShow = true;
    hidden(false);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
