import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetFilterProxy from "./proxy/DialogBetFilterProxy";
import DialogBetFilter from "./views/DialogBetFilter.vue";
const proxy: DialogBetFilterProxy = getProxy(DialogBetFilterProxy);

function show(data:any = null) {
    DialogMount(DialogBetFilter);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
