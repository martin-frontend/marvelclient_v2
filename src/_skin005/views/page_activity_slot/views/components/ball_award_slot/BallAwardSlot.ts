import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PageActivitySlotProxy from "../../../proxy/PageActivitySlotProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import AudioManager from "../../../proxy/AudioManager";

@Component
export default class BallAwardSlot extends AbstractView {
    LangUtil = LangUtil;
    @Prop() audio_node!: any;

    myProxy: PageActivitySlotProxy = this.getProxy(PageActivitySlotProxy);
    pageData = this.myProxy.pageData;
    novigationProxy = PanelUtil.getProxy_novigation;
    ball_info = this.myProxy.pageData.ball_info;
    award_data = this.myProxy.pageData.award_data;

    items = <any>[];
    duration = 2000; // 抽奖转动总时长（毫秒）
    slowStartDuration = 1000; // 开始加速的时长
    slowEndDuration = 1500; // 结束减速的时长
    targetIndex = -1; // 停在指定的抽奖项索引
    maxRunTime = 6000; //最大运行时间

    currentTime = 0; // 当前已经过去的时间
    interval = 0;

    curItemIndex = 0; //当前转动到的item的下标
    fixsUpdataTime = 20; // 固定帧率刷新时间

    isSlowdown = false; //是否减速
    isSpeedUp = false; //是否加速

    time_speed = 0; //什么时候切换到下一个对象
    // arr_upSpeed = [15, 10, 5, 2];
    arr_upSpeed = [8, 5, 2];
    arr_slowSpeed = [2, 5, 8];
    runCount = 0;
    runCount_slow = 0;
    isRunning = false;
    // data
    clickAgain = false;

    /**重置方法 */
    initOptions(target: number) {
        this.isSlowdown = false;
        this.isSpeedUp = false;
        this.items.forEach((item: any) => {
            item.setNomal();
            // item.$el.classList.remove("turn_item_active");
            // item.$el.classList.remove("item_get");
        });
        this.currentTime = 0;
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.time_speed = 0;
        this.targetIndex = target;
        console.log("--->>目标为", this.targetIndex);
        this.runCount = 0;
        this.runCount_slow = -1;
    }

    updateItems() {
        this.currentTime += this.fixsUpdataTime;
        this.time_speed -= this.fixsUpdataTime;
        //总时间已经超过设定的时间了 并且已经转动到了 目标位置
        if (this.currentTime >= this.duration && this.curItemIndex == this.targetIndex && this.targetIndex != -1) {
            this.endTurn();
            return;
        }
        if (this.currentTime > this.maxRunTime) {
            this.endTurn();
            return;
        }
        if (this.time_speed > 0) return;
        //是否开始减速
        this.isSlowdown = this.currentTime >= this.slowEndDuration && this.targetIndex != -1;
        //是否在加速
        this.isSpeedUp = this.currentTime <= this.slowStartDuration;
        //加速阶段
        if (this.isSpeedUp) {
            if (this.runCount >= this.arr_upSpeed.length) this.runCount = this.arr_upSpeed.length - 1;
            this.time_speed = this.fixsUpdataTime * this.arr_upSpeed[this.runCount];
            this.runCount++;
        }
        //减速阶段
        if (this.isSlowdown) {
            if (this.runCount_slow >= this.arr_slowSpeed.length) this.runCount_slow = this.arr_slowSpeed.length - 1;
            this.time_speed = this.fixsUpdataTime * this.arr_slowSpeed[this.runCount_slow];
            this.runCount_slow++;
        }
        if (!this.isSpeedUp && !this.isSlowdown) {
            this.time_speed = this.fixsUpdataTime * 2;
            // console.log("播放 快速声音");
            // AudioManager.Instance.playSound_slot_fast();
        }

        if (!this.items || this.items.length <= 0) {
            // this.items = Array.from(document.querySelectorAll(".turn_item")); // 获取所有抽奖项
            this.items = <any>[];
            this.items.push(this.$refs.item_0);
            this.items.push(this.$refs.item_1);
            this.items.push(this.$refs.item_2);
            this.items.push(this.$refs.item_3);
            this.items.push(this.$refs.item_4);
            this.items.push(this.$refs.item_5);
            this.items.push(this.$refs.item_6);
            this.items.push(this.$refs.item_7);
            this.items.push(this.$refs.item_8);
            this.items.push(this.$refs.item_9);
            // console.log("--对象组为---", this.items);
        }
        this.curItemIndex++;
        this.curItemIndex = this.curItemIndex % 10;

        this.items.forEach((item: any, index: any) => {
            if (index === this.curItemIndex) {
                // item.$el.classList.add("turn_item_active");
                item.setActive();
            } else {
                // item.$el.classList.remove("turn_item_active");
                item.setNomal();
            }
        });
        // if (this.isSpeedUp) {
        //     AudioManager.Instance.playSound_slot_fast();
        // } else if (this.isSlowdown) {
        //     AudioManager.Instance.playSound_slot_slowdown();
        // }
    }

    startTurn(index: number = -1) {
        this.isRunning = true;
        // this.initOptions(Math.round(Math.random() * 9));
        this.initOptions(index);
        // AudioManager.Instance.playSound_slot_begin();
        this.interval = setInterval(this.updateItems, this.fixsUpdataTime); // 每帧更新一次
    }
    endTurn() {
        clearInterval(this.interval);
        this.items.forEach((item: any) => {
            // item.$el.classList.remove("turn_item_active");
            item.setNomal();
        });
        if (this.targetIndex != -1 && this.items[this.targetIndex]) {
            this.items[this.targetIndex].setGet();
            // AudioManager.Instance.playSound_slot_end();
            setTimeout(() => {
                PanelUtil.openpanel_award_ball({ ...this.award_data, ...this.ball_info }, () => {
                    //刷新界面 重新请求数据
                    this.onWatchBallAwardId();
                    this.items.forEach((item: any) => {
                        item.setNomal();
                    });
                });
                this.isRunning = false;
            }, 2000);
        } else this.isRunning = false;
    }

    onTurn() {
        console.log("-->>>收到点击开关");
        // this.testSound();

        // 最后一期结算后，显示活动已结束
        if (this.pageData.ball_award_detail.cycle_status == 2) {
            PanelUtil.message_alert(LangUtil("活动已结束"));
            return;
        }

        // 處理抽獎次數太頻繁 bug
        if (!this.myProxy.isCanClick) return;

        if (!this.chick()) return;
        if (this.isNeedRestart) {
            this.myProxy.api_plat_activity_ball_lottery_init_var(this.novigationProxy.ballAwardId);
            return;
        }
        if (!this.isRunning) {
            // 關閉抽獎按鈕，避免重複點擊
            this.clickAgain = true;
            // this.startTurn();
            this.myProxy.api_plat_activity_ball_lottery_award_var(this.novigationProxy.ballAwardId);
        }
    }

    chick() {
        let param = this.curLotteryCons.params;
        //如果需要重置
        if (this.isNeedRestart) {
            param = this.curDayNumInitConfig.params;
        }
        //检查这个币种的钱的余额
        //@ts-ignore
        const balance = PanelUtil.getProxy_selfproxy.userInfo.gold_info[param.key];
        if (!balance || balance.sum_money < Number(param.value)) {
            PanelUtil.message_confirm({
                message: LangUtil("{0} 余额不足,是否前往充值?", param.key),
                okFun: () => {
                    PanelUtil.openpage_recharge();
                },
                cancelTxt: LangUtil("取消"),
                okTxt: LangUtil("充值"),
                isNeetClose: true,
            });
            return false;
        }
        return true;
    }
    // poolstrarr = [9, 5, 6, 7, 0, 1, 5, 3, 9];
    marqueeTimeHandle = 0; //计时参数
    marqueeCount = 0;
    mounted() {
        this.$nextTick(() => {
            this.startMarqueeRun();
            this.onWatchBallAwardId();
            this.resetCardScale();
        });
    }

    testSound() {
        // const audioInstance = new Audio(require('@/assets/ballaward/sound_res/slot_fast.mp3'));
        // audioInstance.play();
        // const audioInstance = new Audio(require('@/_skin005/assets/ballaward/sound_res/slot_fast.mp3')); // 替换为音频文件路径
        // audioInstance.play();
    }
    /**跑马灯时间 */
    startMarqueeRun() {
        if (this.marqueeTimeHandle) {
            clearInterval(this.marqueeTimeHandle);
        }
        const pool_title_marquee: HTMLElement = <any>this.$refs.ball_award_marquee;
        if (pool_title_marquee) {
            this.marqueeTimeHandle = setInterval(() => {
                this.marqueeCount++;
                if (this.marqueeCount % 2 == 0) {
                    pool_title_marquee.classList.remove("marquee_1");
                    pool_title_marquee.classList.add("marquee_2");
                } else {
                    pool_title_marquee.classList.remove("marquee_2");
                    pool_title_marquee.classList.add("marquee_1");
                }
            }, 500);
        }
    }
    /**自动停止，失败的情况，防止卡死 */
    @Watch("novigationProxy.ballAwardId")
    onWatchBallAwardId() {
        this.myProxy.refreshAllData();
    }

    /**当前的奖励的数据 从60个取出*/
    awardItemData(index: number) {
        if (!this.myProxy.pageData.ball_award_detail) return null;
        const lottery_award = this.myProxy.pageData.ball_award_detail.lottery_award;
        const idx = this.ball_info.lottery_location * 10 + index;
        if (lottery_award && lottery_award.length > idx) {
            return lottery_award[idx];
        }

        return null;
    }

    getCoinSymbol(coinname: string) {
        if (!coinname) return "";
        return CoinTransformHelper.GetCoinSymbol(coinname);
        // return coinname;
    }
    /**获取当前抽奖消耗 */
    get curLotteryCons() {
        //计算当前抽奖次数在哪个范围以内
        const lottery_location = this.ball_info.lottery_location + 1;
        if (this.myProxy.pageData.ball_award_detail) {
            const { lottery_cons } = this.myProxy.pageData.ball_award_detail;
            for (let index = 0; index < lottery_cons.length; index++) {
                const element = lottery_cons[index];
                // console.warn("---->>>", element);
                // console.warn("---->>>", lottery_location);
                if (element.interval && element.interval.length > 0) {
                    const startCount = Number(element.interval[0]);
                    const endCount = Number(element.interval[1]);
                    if (lottery_location < startCount || lottery_location > endCount) {
                        continue;
                    }
                    // console.warn("当前消耗为", element);
                    return element;
                }
            }
        }

        return {
            type: 0,
            params: {
                key: "",
                value: 0,
            },
        };
    }

    /**当前重置消耗 */
    get curDayNumInitConfig() {
        const lottery_location = this.ball_info.user_init_num + 1;
        if (this.myProxy.pageData.ball_award_detail) {
            const { day_num_init_config } = this.myProxy.pageData.ball_award_detail;
            let lastEle = null;
            for (let index = 0; index < day_num_init_config.length; index++) {
                const element = day_num_init_config[index];
                lastEle = element;
                if (element.interval && element.interval.length > 0) {
                    const startCount = Number(element.interval[0]);
                    const endCount = Number(element.interval[1]);
                    if (lottery_location < startCount || lottery_location > endCount) {
                        continue;
                    }

                    return element;
                }
            }
            if (lastEle) {
                return lastEle;
            }
        }

        return {
            type: 0,
            params: {
                key: "",
                value: 0,
            },
        };
    }
    @Watch("myProxy.pageData.award_data.award_index")
    onWatchAward() {
        console.warn("更新中心信息");
        if (this.award_data.award_index != -1) {
            this.targetIndex = this.award_data.award_index % 10;
            this.startTurn(this.targetIndex);
        }
    }
    get turnBtnDisabled() {
        return false;
    }

    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.resetCardScale();
    }
    resetCardScale() {
        if (this.$refs.card_node) {
            let scale_width = this.$vuetify.breakpoint.width / 600;
            scale_width = scale_width < 1 ? scale_width : 1;
            if (!this.$mobile) {
                return;
            } else {
                const height = 640;
                const width = 600;
                scale_width = this.$vuetify.breakpoint.width / width;
                scale_width = scale_width < 1 ? scale_width : 1;
                const scale = scale_width;
                //@ts-ignore
                this.$refs.card_node.$el.style.scale = scale;
                const top_count = height * (1 - scale) * 0.5;
                const left_count = width * (1 - scale) * 0.5;
                //@ts-ignore
                this.$refs.card_node.$el.style.top = -top_count + "px";
                //@ts-ignore
                this.$refs.card_node.$el.style.left = -left_count + "px";
                //@ts-ignore
                this.$refs.card_node.$el.style.marginBottom = -top_count * 2 + "px";
            }
        }
    }
    get isNeedRestart() {
        if (this.ball_info.surplus_lottery_num > 0) return false;
        return true;
    }

    timeHandle = 0;
    timeCount = 0; //当前的剩余时间
    //倒计时时间到
    onTimeOut() {
        this.timeCount = 0;
        if (this.timeHandle) {
            clearInterval(this.timeHandle);
            // 倒计时时间到，重新請求數據
            this.myProxy.refreshAllData();
        }
        this.timeHandle = 0;
    }
    //设置开始倒计时
    setTimeStart(count: number) {
        this.timeCount = Math.floor(count / 1000);
        // 避免倒計時卡住，延遲兩秒再觸發
        console.log("设置时间戳", this.timeCount);
        if (this.timeCount < -2) {
            this.onTimeOut();
            return;
        }
        this.timeHandle = setInterval(() => {
            this.timeCount = this.timeCount - 1;
            if (this.timeCount < -2) {
                this.onTimeOut();
            }
            this.timeStr = this.setTimeStr();
        }, 1000);
    }
    timeStr = "";
    setTimeStr() {
        if (!this.timeCount) return "";

        if (this.pageData.ball_award_detail.cycle_status == 2) {
            return LangUtil("活动已结束");
        }
        //将这个时间转为天时分秒
        const newTimeTotle = this.timeCount;
        // 计算天数
        const days = Math.floor(newTimeTotle / (24 * 60 * 60));
        const remainingSecondsAfterDays = newTimeTotle % (24 * 60 * 60);
        // 计算小时数
        const hours = Math.floor(remainingSecondsAfterDays / (60 * 60));
        const remainingSecondsAfterHours = remainingSecondsAfterDays % (60 * 60);
        // 计算分钟数
        const minutes = Math.floor(remainingSecondsAfterHours / 60);
        // 计算剩余的秒数
        const seconds = remainingSecondsAfterHours % 60;

        let str = "";

        if (days > 0) {
            str = str + days + LangUtil("天");
        }

        if (!(days < 1 && hours < 1)) {
            str = str + hours + LangUtil("时");
        }

        if (!(days < 1 && hours < 1 && minutes < 1)) {
            str = str + minutes + LangUtil("分");
        }

        str = str + seconds + LangUtil("秒");

        return str;
        // if (days < 1) {
        //     return LangUtil("{0}时{1}分{2}秒", hours, minutes, seconds);
        // }
        // return LangUtil("{0}天{1}时{2}分{3}秒", days, hours, minutes, seconds);
    }
    // @Watch("myProxy.pageData.ball_award_detail.current_cycle")
    // onBallAwardDetailChange(val: any, oldVal: any) {
    //     const timenow = Date.now();
    //     this.setTimeStart(this.myProxy.pageData.ball_award_detail.cycle_end_time - timenow);
    // }
    @Watch("myProxy.pageData.ball_award_detail.cycle_end_time")
    onBallAwardDetailChangeCycleTime(val: any, oldVal: any) {
        const timenow = Date.now();
        this.setTimeStart(this.myProxy.pageData.ball_award_detail.cycle_end_time * 1000 - timenow);
    }
    destroyed() {
        if (this.timeHandle) {
            clearInterval(this.timeHandle);
        }
    }
}
