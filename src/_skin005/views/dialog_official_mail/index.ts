import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogOfficialMailProxy from "./proxy/DialogOfficialMailProxy";
import DialogOfficialMail from "./views/DialogOfficialMail.vue";
const proxy: DialogOfficialMailProxy = getProxy(DialogOfficialMailProxy);

function show() {
    DialogMount(DialogOfficialMail);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
