import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogSpinLotteryProxy, { LotteryAward } from "../proxy/DialogSpinLotteryProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogSpinLotteryMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity,
            net.EventType.api_plat_activity_var,
            net.EventType.api_plat_activity_spin_lottery_award_var,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogSpinLotteryProxy = getProxy(DialogSpinLotteryProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity:
                {
                    PanelUtil.showAppLoading(false);
                    myProxy.pageData.activityId = body.list.find((i: any) => i.model_type == 13)?.id;
                }
                break;
            case net.EventType.api_plat_activity_spin_lottery_award_var:
                {
                    myProxy.pageData.loading = false;
                    myProxy.setReward(body);
                }
                break;
            case net.EventType.api_plat_activity_var:
                {
                    if (body.model_type != 13) {
                        return;
                    }
                    PanelUtil.showAppLoading(false);
                    const lottery_award = body.lottery_award.map(
                        (i: { interval: string[] } & Omit<LotteryAward, "lottery_location">, idx: number) => ({
                            award_index: idx,
                            lottery_location: Number(i.interval[0]),
                            params: i.params,
                            type: i.type,
                        })
                    );
                    const rules = {
                        lottery_cons: body.lottery_cons,
                        lottery_award,
                    };
                    myProxy.setRules(rules);
                }
                break;
        }
    }
}
