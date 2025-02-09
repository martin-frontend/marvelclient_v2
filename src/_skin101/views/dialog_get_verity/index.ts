import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGetVerityProxy from "./proxy/DialogGetVerityProxy";
import DialogGetVerity from "./views/DialogGetVerity.vue";
/**获取邮箱验证码 类型:类型 1-绑定手机|2-重置密码|3-收款方式|4-金币划转|5-设置金币密码|6-注册*/
function showEmailVerity(type: number, email: string) {
    DialogMount(DialogGetVerity);
    const myProxy: DialogGetVerityProxy = getProxy(DialogGetVerityProxy);
    const pageData = myProxy.pageData;
    pageData.category = 0;
    myProxy.resetForm();
    Object.assign(pageData.form, {
        type,
        email,
    });
    pageData.bShow = true;
}
/**获取短信验证码 类型:类型 1-绑定手机|2-重置密码|3-收款方式|4-金币划转|5-设置金币密码|6-注册*/
function showSmsVerity(type: number, area_code: string, mobile: string) {
    DialogMount(DialogGetVerity);
    const myProxy: DialogGetVerityProxy = getProxy(DialogGetVerityProxy);
    const pageData = myProxy.pageData;
    pageData.category = 1;
    myProxy.resetForm();
    Object.assign(pageData.form, {
        type,
        area_code,
        mobile,
    });
    pageData.bShow = true;
}

export default { showEmailVerity, showSmsVerity };
