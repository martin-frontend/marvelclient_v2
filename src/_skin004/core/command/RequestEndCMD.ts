import GlobalVar from "@/core/global/GlobalVar";

export default class RequestEndCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        // GlobalVar.net_status.loading = false;
        const body = notification.getBody();
        try {
            const json = JSON.parse(body.result);
            GlobalVar.server_time = json.extend.microtime >> 0;
        } catch (e: any) {
            console.log(body);
        }
    }
}
