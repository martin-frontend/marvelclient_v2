import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogSpeedVerificationProxy from "../proxy/DialogSpeedVerificationProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogSpeedVerificationMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_public_auth_drag];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogSpeedVerificationProxy = getProxy(DialogSpeedVerificationProxy);
        if (!myProxy.pageData.bShow) return;
        switch (notification.getName()) {
            case net.EventType.api_public_auth_drag:
                myProxy.setData(body);
                break;
        }
    }
}
