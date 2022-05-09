export class MessageBoxProxy extends puremvc.Proxy {
    static NAME = "MessageBoxProxy";
    /**
     * bShow: 是否显示
     * bConfirm： 是否为确认框
     * */
    dialogData = {
        bShow: false,
        bConfirm: false,
        title: "",
        message: "",
        cancelFun: null,
        okFun: null,
    };

    reset(bConfirm: boolean, okFun: any, cancelFun?: any) {
        this.dialogData.bShow = true;
        this.dialogData.bConfirm = bConfirm;
        this.dialogData.title = "提示";
        this.dialogData.cancelFun = cancelFun;
        this.dialogData.okFun = okFun;
    }
}

export default class MessageBox {
    static confirm(message: string, title?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const proxy: MessageBoxProxy = <any>puremvc.Facade.getInstance().retrieveProxy(MessageBoxProxy.NAME);
            if (title) proxy.dialogData.title = title;
            proxy.dialogData.message = message;
            proxy.reset(true, resolve, reject);
        });
    }

    static alert(message: string, title?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const proxy: MessageBoxProxy = <any>puremvc.Facade.getInstance().retrieveProxy(MessageBoxProxy.NAME);
            if (title) proxy.dialogData.title = title;
            proxy.dialogData.message = message;
            proxy.reset(false, resolve);
        });
    }
}
