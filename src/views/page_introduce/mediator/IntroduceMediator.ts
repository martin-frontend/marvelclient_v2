import AbstractMediator from "@/core/abstract/AbstractMediator";
import IntroduceProxy from "../proxy/IntroduceProxy";
import getProxy from "@/core/global/getProxy";

export default class IntroduceMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: IntroduceProxy = getProxy(IntroduceProxy);
        switch (notification.getName()) {
            case "":
                //
                break;
        }
    }
}
