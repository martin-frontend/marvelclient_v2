import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyAdduserProxy from "./proxy/DialogDirectlyAdduserProxy";
import DialogDirectlyAdduser from "./views/DialogDirectlyAdduser.vue";
import PanelUtil from "@/_skin005/core/PanelUtil";
const proxy: DialogDirectlyAdduserProxy = getProxy(DialogDirectlyAdduserProxy);

function show() {
    DialogMount(DialogDirectlyAdduser);
    hidden(false);
    proxy.pageData.bShow = true;
    const selfProxy = PanelUtil.getProxy_selfproxy;
    proxy.setData(selfProxy.userInfo);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
