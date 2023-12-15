import Timezone from "@/core/Timezone";
import GameConfig from "@/core/config/GameConfig";

export default class LotteryListProxy extends puremvc.Proxy {
    static NAME = "LotteryListProxy";

    public onRegister(): void {
        this.api_vendor_267_products();
    }

    pageData = {
        //热门彩票
        lotteryList: [],
    };

    set_vendor_267_products(data: any) {
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

    /**获取热门彩票列表 */
    api_vendor_267_products() {
        let timezone = "";
        const defalutTimezone = GameConfig.config.defalutTimezone;
        if (defalutTimezone) {
            timezone = defalutTimezone.split(":")[0];
        } else {
            timezone = Timezone.Instance.curTimezoneItem.key?.split(":")[0];
        }
        this.sendNotification(net.HttpType.api_vendor_267_products, { timezone });
    }
}