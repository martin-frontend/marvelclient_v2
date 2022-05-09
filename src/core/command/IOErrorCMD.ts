import Message from "@/views/common/proxy/MessageProxy";
export default class IOErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        Message.show("服务器无法访问，请检查网络");
    }
}
