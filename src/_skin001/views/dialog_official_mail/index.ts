import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogOfficialMailProxy from "./proxy/DialogOfficialMailProxy";
import DialogOfficialMail from "./views/DialogOfficialMail.vue";

function show() {
    DialogMount(DialogOfficialMail);
    const proxy: DialogOfficialMailProxy = getProxy(DialogOfficialMailProxy);
    proxy.pageData.bShow = true;
}

export default { show };
