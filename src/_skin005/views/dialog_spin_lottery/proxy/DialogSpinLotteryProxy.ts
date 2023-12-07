import PanelUtil from "@/_skin005/core/PanelUtil";

interface Params {
    key: string;
    value: string;
}

export interface LotteryAward {
    award_index: number;
    lottery_location: 1 | 2 | 3;
    params: Params;
    type: "99" | "3";
}

const initialLotteryCons = [
    {
        interval: ["1", "1"],
        type: "3",
        params: {
            key: "Lucky",
            value: "20",
        },
    },
    {
        interval: ["2", "5"],
        type: "3",
        params: {
            key: "Lucky",
            value: "50",
        },
    },
    {
        interval: ["3", "5"],
        type: "3",
        params: {
            key: "Lucky",
            value: "100",
        },
    },
];

const initialRules = {
    lottery_cons: initialLotteryCons,
    lottery_award: [] as Array<LotteryAward>,
};
export type Rules = typeof initialRules;

export enum DeductionLevels {
    beginner = 1,
    intermediate = 2,
    advanced = 3,
}

export const LotteryLocationToColor = new Map([
    [DeductionLevels.beginner, "blue"],
    [DeductionLevels.intermediate, "red"],
    [DeductionLevels.advanced, "golden"],
] as const);

export default class DialogSpinLotteryProxy extends puremvc.Proxy {
    static NAME = "DialogSpinLotteryProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        activityId: 0,
        award_index: -1,
        isSpinning: false,
    };
    gold_info = {} as Record<string, { plat_money: string }>;

    // 活动详情数据
    rules = initialRules;

    lotteryAwardData = {
        location: 1 as 1 | 2 | 3, // 抽奖类型
    };

    get lotteryLocationAvailability() {
        const paramsArr = this.rules.lottery_cons.map((i) => i.params);
        const firstKey = paramsArr[0].key;
        const firstValue = Number(paramsArr[0].value);
        const firstLotteryPlatMoney = Number(this.gold_info?.[firstKey]?.plat_money);
        const secondKey = paramsArr[1].key;
        const secondValue = Number(paramsArr[1].value);
        const secondLotteryPlatMoney = Number(this.gold_info?.[secondKey]?.plat_money);
        const thirdKey = paramsArr[2].key;
        const thirdValue = Number(paramsArr[2].value);
        const thirdLotteryPlatMoney = Number(this.gold_info?.[thirdKey]?.plat_money);
        return {
            1: firstLotteryPlatMoney >= firstValue,
            2: secondLotteryPlatMoney >= secondValue,
            3: thirdLotteryPlatMoney >= thirdValue,
        };
    }

    getColorByLocation(location: 1 | 2 | 3) {
        const color = LotteryLocationToColor.get(location);
        return color;
    }

    getCoinNameByLocation(location: 1 | 2 | 3) {
        const curCoin = this.rules.lottery_cons[location - 1].params.key;
        return curCoin;
    }

    getCurLotteryLocationCoin() {
        const curCoin = this.rules.lottery_cons[this.lotteryAwardData.location - 1].params.key;
        return curCoin;
    }

    getCurLotteryLocationAvailability() {
        return this.lotteryLocationAvailability[this.lotteryAwardData.location];
    }

    get coinAmountByLocation() {
        return this.rules.lottery_cons.reduce(
            (prev, cur, idx) => ({
                ...prev,
                [idx + 1]: cur.params.value,
            }),
            {}
        );
    }

    setData(data: any) {
        this.gold_info = data.gold_info;
    }
    setRules(rules: Rules) {
        this.rules = rules;
    }
    handleClickSpinBtn() {
        this.api_plat_activity_spin_lottery_award_var();
    }
    setReward(data: any) {
        PanelUtil.showAppLoading(false);
        this.pageData.award_index = data.award_index;
        const award = data.award;
        const key = Object.keys(award)[0];
        const obj = { [key]: award[key] };
        if (typeof data.award_index != "number") {
            return;
        }
        setTimeout(() => {
            PanelUtil.openpanel_award(obj);
            this.pageData.isSpinning = false;
            this.pageData.award_index = -1;
        }, 5500);
    }
    /**获取活动详情 */
    api_plat_activity_var(id: number) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_plat_activity_var, { user_id: core.user_id, id });
    }
    api_plat_activity_spin_lottery_award_var() {
        this.pageData.loading = true;
        if (!this.pageData.activityId) return;
        this.sendNotification(net.HttpType.api_plat_activity_spin_lottery_award_var, {
            id: this.pageData.activityId,
            user_id: core.user_id,
            lottery_location: this.lotteryAwardData.location,
        });
    }

    /**获取活动列表 */
    api_plat_activity() {
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity, { user_id: core.user_id });
    }
}
