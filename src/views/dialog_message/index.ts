import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogMessageProxy from "./proxy/DialogMessageProxy";
import DialogMessage from "./views/DialogMessage.vue";

function show(message:string, type:number) {
    DialogMount(DialogMessage);
    const proxy: DialogMessageProxy = getProxy(DialogMessageProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.message = message;
    proxy.pageData.type = type;
}

function info(message:string){
    show(message, 0);
}

function scuess(message:string){
    show(message, 1);
}

function warn(message:string){
    show(message, 2);
}

function error(message:string){
    show(message, 3);
}

export default { info, scuess, warn, error };
