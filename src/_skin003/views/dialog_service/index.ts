import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogServiceProxy from "./proxy/DialogServiceProxy";
import DialogService from "./views/DialogService.vue";

function show(title: string = "", neirong: string = "") {
    DialogMount(DialogService);
    const proxy: DialogServiceProxy = getProxy(DialogServiceProxy);
    proxy.pageData.bShow = true;
    proxy.resetdata();
    proxy.customData.title = title;
    proxy.customData.neirong = neirong;
}

export default { show };
