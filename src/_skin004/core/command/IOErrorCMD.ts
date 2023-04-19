import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";

export default class IOErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        const arr = [
            "api/vendor/96/products",
            "api_test_speed",
            `api/user/${core.user_id}/red_dot_tips`,
            `api/user/show/${core.user_id}`,
            `api/plat/${core.plat_id}/recently_bet_info`,
        ];
        if (!arr.includes(body.url)) {
            dialog_message.error(LangUtil("服务器无法访问，请检查网络"));
        }
    }
}
