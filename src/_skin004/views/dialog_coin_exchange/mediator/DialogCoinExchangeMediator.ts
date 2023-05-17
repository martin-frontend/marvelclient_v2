import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogCoinExchangeProxy from "../proxy/DialogCoinExchangeProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
import dialog_message_box from "@/views/dialog_message_box";

export default class DialogCoinExchangeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_coin_exchange_scale_var, net.EventType.api_user_coin_exchange_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogCoinExchangeProxy = getProxy(DialogCoinExchangeProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_coin_exchange_scale_var:
                myProxy.set_user_coin_exchange_scale_var(body);
                break;
            case net.EventType.api_user_coin_exchange_var:
                myProxy.pageData.loading = false;
                dialog_message_box.alert({
                    message: LangUtil("转换成功"),
                    okFun: () => {
                        this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify([2]) });
                        myProxy.pageData.form.amount = 0;
                    },
                });
                break;
        }
    }
}
