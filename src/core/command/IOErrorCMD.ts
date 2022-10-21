import dialog_message from "@/views/dialog_message";
import LangUtil from "../global/LangUtil";

export default class IOErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        dialog_message.error(LangUtil("网络正在重连，即将获取最新赛事"));
    }
}
