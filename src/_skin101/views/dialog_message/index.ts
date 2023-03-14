import getProxy from "@/core/global/getProxy";
import DialogMessageProxy from "./proxy/DialogMessageProxy";

function show(message: string, type: number) {
    const proxy: DialogMessageProxy = getProxy(DialogMessageProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.message = message;
    proxy.pageData.type = type;
}

function info(message: string) {
    show(message, 0);
}

function success(message: string) {
    show(message, 1);
}

function warn(message: string) {
    show(message, 2);
}

function error(message: string) {
    show(message, 3);
}

export default { info, success, warn, error };
