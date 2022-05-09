import GlobalVar from "../global/GlobalVar";
import Vue from "vue";

export default class RequestStartCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        // Vue.nextTick(() => {
        //     GlobalVar.net_status.loading = true;
        // });
    }
}
