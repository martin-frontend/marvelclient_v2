import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageCoinTaskMediator from "../mediator/PageCoinTaskMediator";
import PageCoinTaskProxy from "../proxy/PageCoinTaskProxy";
import LangUtil from "@/core/global/LangUtil";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import Timezone from "@/core/Timezone";
import { moneyFormat, dateFormat, amountFormat, changeDateShow } from "@/core/global/Functions";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import * as moment from "moment-timezone";
import GlobalVar from "@/core/global/GlobalVar";
@Component
export default class PageCoinTask extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageCoinTaskProxy = this.getProxy(PageCoinTaskProxy);
    pageData = this.myProxy.pageData;
    Timezone = Timezone.Instance;
    moneyFormat = moneyFormat;
    GamePlatConfig = GamePlatConfig;
    selfProxy = PanelUtil.getProxy_selfproxy;
    core = core;
    GlobalVar = GlobalVar;
    amountFormat = amountFormat;
    getCoinAlias = CoinTransformHelper.GetCoinAlias;
    tabIndex = "all"; //用于  切换标签的
    tabOptions = <any>[
        { status: "all", title: LangUtil("全部任务") },
        { status: "2", title: LangUtil("进行中") },
        { status: "1", title: LangUtil("未激活") },
        { status: "3", title: LangUtil("完成") },
        { status: "4", title: LangUtil("过期") },
    ];
    statusOptions = {
        1: LangUtil("未激活"),
        2: LangUtil("进行中"),
        3: LangUtil("完成"),
        4: LangUtil("失败"),
        5: LangUtil("过期"),
        6: LangUtil("已取消"),
    }; //状态:1-未激活|2-进行中|3-成功|4-失败|5-过期|6-取消

    constructor() {
        super(PageCoinTaskMediator);
    }
    destroyed() {
        if (this.timeHandle) {
            clearInterval(this.timeHandle);
            this.timeHandle = 0;
        }
        super.destroyed();
    }
    timeHandle = 0;
    mounted() {
        if (ModulesHelper.IsShow_CoinTaskDisplay()) {
            this.myProxy.api_user_var_coin_task_index();

            if (this.timeHandle) {
                clearInterval(this.timeHandle);
            }
            this.timeHandle = setInterval(() => {
                this.myProxy.api_user_var_coin_task_index();
            }, 30 * 1000);
        }
    }

    get coinTaskList() {
        let arr: any = [];
        switch (this.tabIndex) {
            case "all":
                // @ts-ignore
                arr = this.pageData.list.filter((itme) => [1, 2].includes(itme.status));
                arr = arr.sort(this.sortByProperties);
                break;
            case "1":
            case "2":
            case "3":
                // @ts-ignore
                arr = this.pageData.list.filter((itme) => itme.status == this.tabIndex);
                arr.sort(this.sortByTime);
                break;
            case "4":
                // @ts-ignore
                arr = this.pageData.list.filter((itme) => itme.status >= this.tabIndex);
                arr.sort(this.sortByTime);
                break;
        }
        return arr;
    }

    convertCoinName(coinStr: any, isUseCoinAlias: boolean = false) {
        const coinKey = coinStr.substring(coinStr.indexOf("-") + 1);
        if(isUseCoinAlias) {
            return this.getCoinAlias(coinKey);
        }
        return coinKey;
        // return coinStr.split("-")[0];
    }

    calculateProgress(data: any) {
        const curVal = data.water;
        const endVal = data.water_need;
        return Math.min((curVal / endVal) * 100, 100);
    }

    onGiveUp(coin_task_id: number) {
        PanelUtil.message_confirm({
            message: LangUtil("当前任务正在进行中，是否取消？"),
            okFun: () => {
                this.myProxy.api_user_var_coin_task_cancel(coin_task_id);
            },
        });
    }

    downcount(end_time: any) {
        // console.log("收到时间为", end_time);
        const endTime = moment.tz(end_time, "Asia/Shanghai");
        // 将北京时间转换为本地时间
        const localTime = endTime.local();

        // 获取本地时间对象的时间戳（以毫秒为单位）
        const localTimestamp = localTime.valueOf();
        // console.log("转为本地之后的时间戳为", localTimestamp);
        const nowTime = Date.now();
        const remainingTime = localTimestamp - nowTime;
        const remainingValue = this.convertRemainingTime(remainingTime);
        if (remainingValue[0] >= 1) {
            return remainingValue[0] + LangUtil("天");
        } else {
            let result = "";
            if (remainingValue[0] > 0) {
                result += remainingValue[0] + LangUtil("天");
            }
            if (remainingValue[1] > 0) {
                result += remainingValue[1] + LangUtil("小时");
            }
            if (remainingValue[2] > 0) {
                result += remainingValue[2] + LangUtil("分钟");
            }
            if (remainingValue[3] > 0) {
                result += remainingValue[3] + LangUtil("秒");
            }
            return result;
        }
    }
    convertRemainingTime(remainingTime: any) {
        // 計算天、小時、分鐘和秒
        let seconds = Math.floor(remainingTime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // 取得餘數
        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        return [days, hours, minutes, seconds];
    }
    mappingImg(task_coin_name_unique: any) {
        // let type = task_coin_name_unique.split("-")[1];
        let type = task_coin_name_unique.substring(task_coin_name_unique.indexOf("-") + 1);
        if (!type) {
            type = task_coin_name_unique.split("-")[0];
        }
        //Slots、Live、Casino、Cricket、FootBall、Sport
        const map = <any>{
            Slots: require("@/_skin005/assets/coin_task/slots.png"),
            Live: require("@/_skin005/assets/coin_task/live.png"),
            Casino: require("@/_skin005/assets/coin_task/casino.png"),
            Cricket: require("@/_skin005/assets/coin_task/cricket.png"),
            FootBall: require("@/_skin005/assets/coin_task/footBall.png"),
            Sport: require("@/_skin005/assets/coin_task/sport.png"),
            All: require("@/_skin005/assets/coin_task/all.png"),
            Bonus: require("@/_skin005/assets/coin_task/bonus.png"),
        };

        map["Sports"] = require("@/_skin005/assets/coin_task/sport.png");
        map["All-Types"] = require("@/_skin005/assets/coin_task/all.png");
        map["Live-Casino"] = require("@/_skin005/assets/coin_task/live.png");

        if (GlobalVar.skin == "skin005") {
            map["Sports"] = require("@/_skin005/assets/coin_task/96in/sport.png");
            map["All-Types"] = require("@/_skin005/assets/coin_task/96in/all.png");
            map["Live-Casino"] = require("@/_skin005/assets/coin_task/96in/live.png");
            map["Casino"] = require("@/_skin005/assets/coin_task/96in/casino.png");
            map["Cricket"] = require("@/_skin005/assets/coin_task/96in/cricket.png");
            map["Football"] = require("@/_skin005/assets/coin_task/96in/footBall.png");
            map["Slots"] = require("@/_skin005/assets/coin_task/96in/slots.png");
            map["Bonus"] = require("@/_skin005/assets/coin_task/96in/bonus.png");
        }

        const keys = Object.keys(map);
        if (!keys.includes(type)) {
            const new_type = type.split("-")[1];
            if (new_type) {
                type = new_type;
            }
        }
        return map[type];
    }

    get mainCoin() {
        return this.GamePlatConfig.getMainCoin();
    }
    transformMoney_sum_money(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, this.mainCoin, "", true, true, false);
    }

    sortByTime(a: any, b: any) {
        const timeA = Date.parse(a.end_time);
        const timeB = Date.parse(b.end_time);

        if (timeA < timeB) {
            return -1;
        }
        if (timeA > timeB) {
            return 1;
        }
        return 0;
    }

    // 比较函数，先根据状态再根据名称再根据时间进行排序
    sortByProperties(a: any, b: any) {
        const statusOrder = [2, 1, 3, 4, 5, 6]; // 狀態的特定順序
        const statusA = a.status;
        const statusB = b.status;
        const indexA = statusOrder.indexOf(statusA);
        const indexB = statusOrder.indexOf(statusB);

        const nameOrder = ["All", "Slots", "Live", "Casino", "Cricket", "FootBall", "Sport"]; // 狀態的特定順序
        const nameA = a.task_coin_name_unique.split("-")[1];
        const nameB = b.task_coin_name_unique.split("-")[1];

        const indexC = nameOrder.indexOf(nameA);
        const indexD = nameOrder.indexOf(nameB);

        const timeA = Date.parse(a.end_time);
        const timeB = Date.parse(b.end_time);

        if (indexA < indexB) {
            return -1;
        }
        if (indexA > indexB) {
            return 1;
        }

        if (indexC < indexD) {
            return -1;
        }
        if (indexC > indexD) {
            return 1;
        }

        if (timeA < timeB) {
            return -1;
        }
        if (timeA > timeB) {
            return 1;
        }

        return 0;
    }
    isCanPlayGame(coinname: string) {
        //@ts-ignore
        return this.selfProxy.userInfo.gold_info[coinname] && this.selfProxy.userInfo.gold_info[coinname].can_play_game == 1;
    }
    transformTime(date: any) {
        return Timezone.Instance.convertTime_to_Locale(date);
    }
    getDate(str: string, isChange: boolean = true) {
        return changeDateShow(str, isChange);
    }

    isCoinNotEnough(item: any) {
        if (item.status == 1 || item.status == "1") return false;
        const transfer_amount = Number(item.transfer_amount);
        const task_coin_amount = Number(item.task_coin_amount);
        const res = (transfer_amount / task_coin_amount) * 100;
        if (res > 10) {
            return false;
        }

        return amountFormat(res, true) + "%";
    }
}
