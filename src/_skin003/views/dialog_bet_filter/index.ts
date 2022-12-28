import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetFilterProxy from "./proxy/DialogBetFilterProxy";
import DialogBetFilter from "./views/DialogBetFilter.vue";

function show(data:any = null) {
    DialogMount(DialogBetFilter);
    const proxy: DialogBetFilterProxy = getProxy(DialogBetFilterProxy);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

export default { show };
