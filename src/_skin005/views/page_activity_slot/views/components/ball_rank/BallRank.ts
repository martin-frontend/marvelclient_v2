import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PageActivitySlotProxy from "../../../proxy/PageActivitySlotProxy";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import { changeDateShow } from "@/core/global/Functions";
import Timezone from "@/core/Timezone";

@Component
export default class BallRank extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageActivitySlotProxy = this.getProxy(PageActivitySlotProxy);
    pageData = this.myProxy.pageData;

    /**表头数据 */
    tabIndex = 0;
    tabArr = ["本次排名", "上次排名", "记录"];

    onTabChange(idx: any) {
        this.tabIndex = idx;
    }

    /**记录中的页签 */
    recordTabArr = ["获奖记录", "号码记录"];
    recordTabIndex = 0;

    onRecordTabChange(idx: any) {
        this.recordTabIndex = idx;
    }
    get ball_info() {
        return this.myProxy.pageData.ball_info;
    }

    get rankDataList() {
        switch (this.tabIndex) {
            case 0:
                return this.pageData.ball_award_detail.current_ball_rank || [];
            case 1:
                return this.pageData.ball_award_detail.pre_ball_rank || [];
            // case 2:
            //     return this.pageData.ball_info.lottery_record || [];
            case 2: {
                if (this.recordTabIndex == 0) {
                    return this.pageData.ball_info.award_record || [];
                }
                return this.pageData.ball_info.lottery_record || [];
            }
        }

        return [];
    }

    /**是否有可以领取的 */
    get isHaveRecord() {
        const ishave =
            this.pageData.ball_info.award_record &&
            this.pageData.ball_info.award_record.some((ele: any, index: any, arr: any) => {
                return this.getBtnState(ele);
            });
        return ishave;
    }
    //排名前3的图片
    getRankImg(no: any) {
        if (!no) return null;
        if (Number(no) > 3) {
            return null;
        }
        return require(`@/_skin005/assets/ballaward/rank_no_${no}.png`);
    }
    //获取奖励的币种与金额
    getAwardValue(item: any) {
        if (!item || !item.award_config || !item.award_config.params) {
            return "";
        }
        //奖池奖励
        if (item.award_config.type + "" == "4") {
            return item.award_config.params.value + "%";
        }
        return CoinTransformHelper.GetCoinSymbol(item.award_config.params.key) + item.award_config.params.value;
        // const keys = Object.keys(item.coin_gold);
        // let str = "";
        // for (let index = 0; index < keys.length; index++) {
        //     if (index != 0) {
        //         str = str + "<br/>";
        //     }
        //     str = str + CoinTransformHelper.GetCoinSymbol(keys[index]);
        //     str = str + item.coin_gold[keys[index]];
        // }
        // return str;
    }
    //获取球的数组
    getBallData(item: any) {
        const lottery_code = (item || "").replace(/\*/g, "?");
        const arr = lottery_code.split("");
        return arr;
    }
    getDate(str: string, isChange: boolean = true) {
        return changeDateShow(str, isChange);
    }
    //1:排名奖 2:幸运奖
    getAwardType(item: any) {
        return item.award_type == 1 ? LangUtil("排名奖") : LangUtil("幸运奖");
    }
    // 本次排名名次
    get myRankText() {
        if (this.myProxy.pageData.ball_info && this.myProxy.pageData.ball_info.my_rank != -1) {
            return this.myProxy.pageData.ball_info.my_rank;
        }
        return LangUtil("未上榜");
    }
    // 上次排名名次
    get myPreRankText() {
        if (this.myProxy.pageData.ball_info && this.myProxy.pageData.ball_info.pre_my_rank != -1) {
            return this.myProxy.pageData.ball_info.pre_my_rank;
        }
        return LangUtil("未上榜");
    }
    // 本次球號
    get myBallStr() {
        const { lottery_code } = this.myProxy.pageData.ball_info;
        // return this.myProxy.pageData.ball_info.lottery_code;
        return this.getBallData(lottery_code);
    }
    // 上次球號
    get myPreBallStr() {
        const { pre_lottery_code } = this.myProxy.pageData.ball_info;
        return this.getBallData(pre_lottery_code);
    }
    // 本次排名期號處理
    get cycleNum () {
        const length = this.pageData.ball_award_detail.current_cycle.toString().length;
        switch (length) {
            case 1:
                return `000${this.pageData.ball_award_detail.current_cycle}`
            case 2:
                return `00${this.pageData.ball_award_detail.current_cycle}`
            case 3:
                return `0${this.pageData.ball_award_detail.current_cycle}`
            case 4:
                return this.pageData.ball_award_detail.current_cycle
            default:
                break;
        }
    }
    // 上次排名期號處理
    get cyclePreNum () {
        if (this.pageData.ball_award_detail.current_cycle == 1) {
            return LangUtil("暂无最新信息")
        }

        const length = this.pageData.ball_award_detail.current_cycle.toString().length;
        const new_num = this.pageData.ball_award_detail.current_cycle - 1;
        switch (length) {
            case 1:
                return `${LangUtil("期号：No.")}000${new_num}`
            case 2:
                return `${LangUtil("期号：No.")}00${new_num}`
            case 3:
                return `${LangUtil("期号：No.")}0${new_num}`
            case 4:
                return `${LangUtil("期号：No.") + new_num}`
            default:
                break;
        }
    }
    // 手机版上次排名期號處理
    get mobileCyclePreNum () {
        if (this.pageData.ball_award_detail.current_cycle == 1) {
            return LangUtil("暂无最新信息")
        }

        const length = this.pageData.ball_award_detail.current_cycle.toString().length;
        const new_num = this.pageData.ball_award_detail.current_cycle - 1;
        switch (length) {
            case 1:
                return `${LangUtil("No.")}000${new_num}`
            case 2:
                return `${LangUtil("No.")}00${new_num}`
            case 3:
                return `${LangUtil("No.")}0${new_num}`
            case 4:
                return `${LangUtil("No.") + new_num}`
            default:
                break;
        }
    }
    onBtnGetAward(item: any) {
        if (!item || !item.award_id) {
            return;
        }
        // 當領取獎勵按鈕為 21-派送已领取時，不要有任何反應
        if (item.award_status == 21) {
            return;
        }
        this.myProxy.api_plat_activity_ball_rewards_var_receive(this.pageData.ball_award_detail.id, item.award_id);
    }
    /**领取按钮的状态 */
    getBtnState(item: any) {
        //11-未派送|12-派送未领取|21-派送已领取|91-派送失败
        if (item && (item.award_status == 11 || item.award_status == "11")) {
            return true;
        }
        return false;
    }

    get timeStr() {
        if (!this.myProxy.pageData.ball_award_detail.pre_end_time) return "";
        return Timezone.Instance.convertTime_to_Locale_utc(this.myProxy.pageData.ball_award_detail.pre_end_time * 1000);
    }
}
