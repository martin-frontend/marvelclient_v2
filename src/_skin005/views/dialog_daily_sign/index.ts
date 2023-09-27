/*
 * @Author: custer custer@xx.xx
 * @Date: 2023-06-22 02:51:52
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-21 16:59:15
 * @FilePath: /marvelclient_v2/src/_skin005/views/dialog_daily_sign/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDailySignProxy from "./proxy/DialogDailySignProxy";
import DialogDailySign from "./views/DialogDailySign.vue";
const proxy: DialogDailySignProxy = getProxy(DialogDailySignProxy);
function show(data: any = null) {
    DialogMount(DialogDailySign);

    proxy.pageData.bShow = true;
    if (data) {
        proxy.setData(data);
    }
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show, hidden };
