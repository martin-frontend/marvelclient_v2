import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGetVerityProxy from "./proxy/DialogGetVerityProxy";
import DialogGetVerity from "./views/DialogGetVerity.vue";

function show(type:number, email:string) {
    DialogMount(DialogGetVerity);
    const proxy: DialogGetVerityProxy = getProxy(DialogGetVerityProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.form.type = type;
    proxy.pageData.form.email = email;
    proxy.api_public_auth_code();
}

function register(email:string){
    show(1, email);
}

function password(email:string){
    show(2, email);
}

function wallet(email:string){
    show(3, email);
}

export default { register, password, wallet };
