import dialog_message from "@/views/dialog_message";
import LangUtil from "../global/LangUtil";

export default class IOErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        dialog_message.error(LangUtil("服务器无法访问，请检查网络"));
    }
}
