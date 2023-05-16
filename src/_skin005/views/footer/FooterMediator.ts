import AbstractMediator from "@/core/abstract/AbstractMediator";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class FooterMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_notice_show_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        switch (notification.getName()) {
            case net.EventType.api_plat_var_notice_show_var:
                if (body.type_position == 11 || body.type_position == "11" || body.type_position == 12 || body.type_position == "12") {
                    PanelUtil.appproxy.setLoading(false);
                    const obj = {
                        activity_name: body.name,
                        link_url: body.content,
                    };
                    PanelUtil.openpanel_notice_detail(obj);
                }
                break;
        }
    }
}
