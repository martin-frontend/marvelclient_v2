import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GlobalVar from "@/core/global/GlobalVar";
import GameProxy from "@/proxy/GameProxy";
import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { dateFormatForTimezone } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import Timezone from "@/core/Timezone";
import LotteryListProxy from "../lottery_list/LotteryListProxy";

@Component
export default class LotteryItem extends AbstractView {
    LangUtil = LangUtil;
    GlobalVar = GlobalVar;
    GameConfig = GameConfig;
    myProxy: LotteryListProxy = getProxy(LotteryListProxy);

    @Prop() lotteryItem: any;
    timer = 0;
    server_time = GlobalVar.server_time;
    lottery_levels = ["一等奖", "二等奖", "三等奖"];

    mounted() {
        this.timer = setInterval(() => {
            this.server_time = GlobalVar.server_time;
        }, 1000);
    }

    destroyed(): void {
        clearInterval(this.timer);
        super.destroyed();
    }
    /**开奖时间 */
    get draw_plan_at(): string {
        let timezone = "";
        const defalutTimezone = GameConfig.config.defalutTimezone;
        if (defalutTimezone) {
            timezone = defalutTimezone.split(":")[0];
        } else {
            timezone = Timezone.Instance.curTimezoneItem.key?.split(":")[0];
        }
        return dateFormatForTimezone(this.lotteryItem.current.draw_plan_at_timestamp * 1000, parseInt(timezone), "yyyy-MM-dd hh:mm:ss");
    }

    //倒计时时间
    get countdownParts() {
        const time = this.lotteryItem.current.draw_plan_at_timestamp - this.server_time;
        if (time <= 0) this.myProxy.api_vendor_267_products();
        const hours = (time / 3600) >> 0;
        const minutes = ((time - hours * 3600) / 60) >> 0;
        const seconds = (time - hours * 3600 - minutes * 60) >> 0;
        return { hours, minutes, seconds };
    }

    //上期开奖号码
    get draw_no() {
        return this.lotteryItem.previous.draw_no;
    }
    getDrawNoByNum(num: number) {
        return this.lotteryItem.previous.draw_no.split(",")[num];
    }
    //开奖状态
    get drawStatus() {
        const draw_status = this.lotteryItem.previous.draw_status;
        if (draw_status == 5) return LangUtil("开奖取消");
        else return LangUtil("开奖中");
    }

    //检测单双大小的数字
    get checkNum() {
        let numStr = "";
        const {
            game_id,
            previous: { draw_no = "" },
        } = this.lotteryItem;
        switch (game_id) {
            case 1:
                numStr = draw_no.substring(2, 4);
                break;
            case 2:
                numStr = draw_no.substring(0, 2);
                break;
            case 3:
                numStr = draw_no.substring(3, 4);
                break;
        }
        return parseInt(numStr);
    }

    get panamaLevelsClass() {
        const mod = Math.floor((this.$vuetify.breakpoint.width - 1500) / 70);
        const clsName = `gap-x-${Math.min(mod * 2 + 4, 32)}`;
        return {
            "gap-x-4": this.$vuetify.breakpoint.width > 1354,
            [clsName]: this.$vuetify.breakpoint.width > 1500,
        };
    }

    get countdownDigits() {
        const { hours, minutes, seconds } = this.countdownParts;
        const tenHoursCount = Math.floor(hours / 10);
        const tenMinutesCount = Math.floor(minutes / 10);
        const tenSecondsCount = Math.floor(seconds / 10);
        const first3rd5th = [tenHoursCount, tenMinutesCount, tenSecondsCount] as const;
        const second4th6th = [hours % 10, minutes % 10, seconds % 10] as const;
        const emptyArr = Array(3).fill(0);
        const digits = emptyArr.map((_, idx) => [first3rd5th[idx], second4th6th[idx]] as const);
        return digits;
    }

    get countdownNearEnd() {
        const { hours, minutes, seconds } = this.countdownParts;
        return hours == 0 && minutes == 0 && seconds < 2;
    }

    get itemIconClass() {
        if (this.$xsOnly) {
            return "justify-center";
        }
        return "ml-4";
    }

    onEnter() {
        const gameProxy: GameProxy = this.getProxy(GameProxy);
        PanelUtil.showAppLoading(true);
        gameProxy.go_soccer(null, GameConfig.config.LotteryVendorId.toString(), this.lotteryItem.game_id);
    }

    @Watch("countdownNearEnd")
    refetchHotProducts() {
        if (!this.countdownNearEnd) return;
        this.myProxy.api_vendor_267_products();
    }
}
