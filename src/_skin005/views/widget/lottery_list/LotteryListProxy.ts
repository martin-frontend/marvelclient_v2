import Timezone from "@/core/Timezone";
import GameConfig from "@/core/config/GameConfig";

export default class LotteryListProxy extends puremvc.Proxy {
    static NAME = "LotteryListProxy";

    public onRegister(): void {
        this.api_vendor_var_products();
    }

    pageData = {
        //热门彩票
        lotteryList: [],
    };

    api_vendor_var_products() {
        const { LotteryVendorId, defalutTimezone } = GameConfig.config;

        let timezone = "";
        if (defalutTimezone) {
            timezone = defalutTimezone.split(":")[0];
        } else {
            timezone = Timezone.Instance.curTimezoneItem.key?.split(":")[0];
        }
        const obj = { timezone, vendor_id: LotteryVendorId };
        const url = net.getUrl(net.HttpType.api_vendor_var_products, obj);
        net.Http.request(obj, url).then((result: any) => {
            const { status, data } = result;
            if (status === 0) {
                for (const item of data) {
                    if (item.game_id == 1) item.sort = 1;
                    else if (item.game_id == 2) item.sort = 0;
                    else if (item.game_id == 3) item.sort = 2;
                    else item.sort = 1000;
                }
                this.pageData.lotteryList = data.sort((a: any, b: any) => {
                    if (a.sort > b.sort) return 1;
                    else return -1;
                });
            }
        })
    }
}