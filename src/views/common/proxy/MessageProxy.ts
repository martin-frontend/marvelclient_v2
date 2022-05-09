export class MessageProxy extends puremvc.Proxy {
    static NAME = "MessageProxy";

    dialogData: any = {
        bShow: false,
        message: "",
    };
}

export default class Message {
    static show(message: string) {
        const myProxy: MessageProxy = <any>puremvc.Facade.getInstance().retrieveProxy(MessageProxy.NAME);
        myProxy.dialogData.bShow = true;
        myProxy.dialogData.message = message;
    }
    static error(value: any) {
        if (value.data && value.data.message) {
            this.show(value.data.message);
        } else {
            this.show(value.message || value);
        }
    }
}
