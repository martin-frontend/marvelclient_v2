import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBetRecordProxy from "../proxy/DialogBetRecordProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogBetRecordMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogBetRecordProxy = getProxy(DialogBetRecordProxy);
        switch(notification.getName()){}
    }
}