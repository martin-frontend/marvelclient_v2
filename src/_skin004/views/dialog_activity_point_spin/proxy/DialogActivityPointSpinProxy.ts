import GamePlatConfig from "@/core/config/GamePlatConfig";
import Utils from "@/core/global/Utils";
import dialog_award from "../../dialog_award";

export default class DialogActivityPointSpinProxy extends puremvc.Proxy {
    static NAME = "DialogActivityPointSpinProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        rankTagIndex: 1, //排行榜标签索引  1:我的排名 2:世界排名 3:完成排名 默认:1
        activeIndex: 0, //活动索引
        bShowAward: false,
        isSpinRun: false,
        isCanSpin: false,
        isRankLoad: true,
        user_point: 0,
        playCount: 0,
        scoreData: {
            progress_value: 0, //百分数
            progress_buffer_value: 0, //缓冲值
            remaining: 0, //剩余
            curScore: 0, //当前积分
            totleScore: 0, //总积分
        },
        data: <any>{
            rule_desc: "", //活动说明
            point_lottery_cons: <any>[], //抽奖消耗
            point_lottery_award: <any>[], //奖励列表
            routine_task: [
                {
                    condition: {
                        type: 91, // 条件,只支持积分
                        params: ["8", "8"], // 活动总积分
                    },
                    award: {
                        // 奖励
                        type: 91,
                        params: ["9", "9"],
                    },
                },
            ],
            last_end_time: 0, // 最后截止时间
            user_point: 0, // 用户积分
            user_ticket: 0, // 用户抽奖卷
            award_id: 0, // 奖励id
            award_status: 0, // 奖励状态 11:未派送 12:派送未领取 21:派送已领取
        },
        rankData: <any>[], //排行榜数据
        point_lottery_cons_cur: <any>null, //当前消耗
        routine_task_cur: <any>null, //当前的奖励情况
        lottery_callback_info: {
            type: 90,
            award_index: 0,
            value: {
                weight: "1",
                type: 90,
                params: ["10", "10"],
            },
        },
        link: "",
        qrCode: "",
    };

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData, {
            rankTagIndex: 1,
        });
        Object.assign(this.pageData.data, {
            award_status: 0,
        });
        Object.assign(this.pageData.scoreData, {
            progress_value: 0,
            progress_buffer_value: 0,
        });
    }

    regetData() {
        this.getDetailData(this.pageData.activeIndex);
        this.getRankListData();
    }
    getDetailData(id: number) {
        this.pageData.loading = true;
        this.pageData.activeIndex = id;
        this.sendNotification(net.HttpType.api_plat_activity_var, { id: id });
    }
    getRankListData(id: number = 0) {
        this.pageData.rankData.length = 0;
        this.pageData.isRankLoad = true;
        this.pageData.loading = true;
        const obj = {
            activity_id: id || this.pageData.activeIndex,
            type: this.pageData.rankTagIndex,
        };
        this.sendNotification(net.HttpType.api_plat_activity_every_point_lottery_rank_list, obj);
    }
    setData(data: any) {
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.data, data);
        this.pageData.point_lottery_cons_cur = this.pageData.data.point_lottery_cons[0];
        this.pageData.routine_task_cur = this.pageData.data.routine_task[0];
        const condition_totle = this.getItemCountValue(this.pageData.routine_task_cur.condition);

        this.pageData.scoreData.curScore = Math.min(condition_totle, this.pageData.data.user_point);
        this.pageData.scoreData.totleScore = condition_totle;
        this.pageData.scoreData.remaining = Math.max(0, this.pageData.scoreData.totleScore - this.pageData.scoreData.curScore);
        /**剩余的积分 */
        /**百分比 */
        if (!condition_totle || !this.pageData.data.user_point) {
            this.pageData.scoreData.progress_buffer_value = 0;
        } else {
            this.pageData.scoreData.progress_buffer_value = Math.min(
                100,
                (Number(this.pageData.data.user_point) / Number(condition_totle)) * 100
            );
        }
        setTimeout(() => {
            this.pageData.scoreData.progress_value = this.pageData.scoreData.progress_buffer_value;
        }, 1000);
        const point_lottery_cons = this.pageData.data.point_lottery_cons;
        this.pageData.isCanSpin = false;
        this.pageData.user_point = 0;
        if (point_lottery_cons && point_lottery_cons.length > 0) {
            const cur_cons = point_lottery_cons[0];
            const cons_value = Number(this.getItemCountValue(cur_cons));
            let user_point = 0;
            if (cur_cons.type == 3) {
                //@ts-ignore
                user_point = PanelUtil.getProxy_selfproxy.userInfo.gold_info[cur_cons.params[0]].sum_money;
            } else if (cur_cons.type == 90) {
                user_point = this.pageData.data.user_point;
            } else if (cur_cons.type == 91) {
                user_point = this.pageData.data.user_ticket;
            } else {
                console.warn("类型不正确", cur_cons);
            }
            this.pageData.isCanSpin = Number(user_point) >= cons_value;
            this.pageData.user_point = user_point;
        } else {
            console.warn("---抽奖消耗配置不正确");
        }

        const point_lottery_award = this.pageData.data.point_lottery_award;
        for (let index = 0; index < point_lottery_award.length; index++) {
            const item = point_lottery_award[index];

            for (let index = 0; index < item.params.length; index++) {
                const element = item.params[index];
                if (!element || Number(element) <= 0) {
                    item.type = 4;
                    break;
                }
            }
        }
    }
    setRankListData(data: any) {
        this.pageData.rankData.length = 0;
        this.pageData.isRankLoad = false;
        if (!data || !data.list) return;

        this.pageData.rankData.push(...data.list);
    }
    pointLotteryCallback(data: any) {
        Object.assign(this.pageData.lottery_callback_info, data);
        this.pageData.loading = false;
        this.pageData.playCount++;
    }
    getAwardImgPathByType(type: any, params: any) {
        let isNoValue = false;
        const keys = Object.keys(params);

        for (let index = 0; index < keys.length; index++) {
            const element = params[keys[index]];
            if (!element || Number(element) <= 0) {
                isNoValue = true;
                break;
            }
        }
        if (isNoValue) {
            return require(`@/_skin004/assets/activity_point_spin/item_thanks_2.png`);
        }

        switch (type) {
            case 3: {
                const keys = Object.keys(params);
                return GamePlatConfig.config.plat_coins[keys[0]].icon;
            }
            case 4:
                return require(`@/_skin004/assets/activity_point_spin/item_thanks.png`);
            case 90:
                return require(`@/_skin004/assets/activity_point_spin/item_coin.png`);
            case 91:
                return require(`@/_skin004/assets/activity_point_spin/item_ticks.png`);

            default:
                break;
        }
    }
    getAwardValueByType(type: any, params: any) {
        if (!params) return 0;

        let val = 0;
        if (type == 3) {
            const keys = Object.keys(params);
            // return params[keys[0]];
            val = params[keys[0]];
        } else {
            val = params[type];
        }
        if (val && Number(val) > 0) return val;
        return 0;
    }
    getItemImgPath(item: any) {
        if (!item) return;

        let isNoValue = false;
        for (let index = 0; index < item.params.length; index++) {
            const element = item.params[index];
            if (!element || Number(element) <= 0) {
                isNoValue = true;
                break;
            }
        }
        if (isNoValue) {
            return require(`@/_skin004/assets/activity_point_spin/item_thanks.png`);
        }
        switch (item.type) {
            case 4:
                return require(`@/_skin004/assets/activity_point_spin/item_thanks.png`);
            case 90:
                return require(`@/_skin004/assets/activity_point_spin/item_coin.png`);
            case 91:
                return require(`@/_skin004/assets/activity_point_spin/item_ticks.png`);
            case 3: {
                return GamePlatConfig.config.plat_coins[item.params[0]].icon;
            }

            default:
                break;
        }
    }
    getItemCountValue(item: any) {
        if (!item) return;
        const params = item.params;
        switch (item.type) {
            case 4:
                return "";
            case 91:
            case 90:
                return params[0];
            case 3: {
                return params[1];
            }

            default:
                break;
        }
        console.warn("---类型不对--", item);
        return "";
    }

    api_plat_activity_every_point_lottery_var() {
        if (!core.user_id) return;
        // PanelUtil.showAppLoading(true);
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_plat_activity_every_point_lottery_var, { id: this.pageData.activeIndex });
    }
    /**业绩查询--获取推广链接*/
    api_user_var_short_chain(force: number = 0) {
        if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id, host: location.origin, force });
    }
    async setLink(url: string) {
        this.pageData.link = url;
        const imgBase64 = await Utils.generateQrcode(url);
        this.pageData.qrCode = imgBase64;
    }
    onClose() {
        this.pageData.bShow = false;
    }

    api_plat_activity_ball_rewards_var_receive() {
        if (!core.user_id) return;
        const obj = {
            user_id: core.user_id,
            award_id: this.pageData.data.award_id,
            id: this.pageData.activeIndex,
        };

        this.sendNotification(net.HttpType.api_plat_activity_ball_rewards_var_receive, obj);
    }
    onRewardReceive(body: any) {
        console.warn("--领奖返回---", body);
        if (body && body.award_info) {
            dialog_award.show(body.award_info);
            // PanelUtil.openpanel_award(body.award_info);
        } else {
            console.error("领取奖励为空", body);
        }
        this.regetData();
    }
}
