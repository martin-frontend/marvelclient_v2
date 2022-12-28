import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBankcardInfoProxy from "./proxy/DialogBankcardInfoProxy";
import DialogBankcardInfo from "./views/DialogBankcardInfo.vue";

function show(data:any=null) {
    DialogMount(DialogBankcardInfo);
    const proxy: DialogBankcardInfoProxy = getProxy(DialogBankcardInfoProxy);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

export default { show };
