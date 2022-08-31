import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";

export default class DialogPromotionStatisticsProxy extends puremvc.Proxy {
    static NAME = "DialogPromotionStatisticsProxy";
 
    pageData = {
        loading: false,
        bShow: false,
        //查询数据 
        listQuery: {
            user_id: core.user_id,
            agent_user_id: '',
            from_date: '',
            to_date: '',
        },
        list: <any>{},
        idButtonActive: false,
        dateButtonActive: false,
        search: {
            agent_user_id: '',
            dateArr: <any>[],
        },
        isShowFormula: 0,
        formulaData: {
            user_loss: "",
            bonus_ratio: "",
            bonus: ""
        },
        tableData: <any>[]
    };
    //如果是列表，使用以下数据，否则删除
    reset() {
        Object.assign(this.pageData.listQuery, {
            agent_user_id: '',
            from_date: '',
            to_date: '',
        });
        Object.assign(this.pageData.search, {
            agent_user_id: core.user_id,
            dateArr: [dateFormat(getTodayOffset(-6), "yyyy-MM-dd"), dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd")],
        });
        this.pageData.tableData.length = 0;
        this.pageData.isShowFormula = 0;
    }

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.list = data;
        this.pageData.isShowFormula = data.user_loss_formula.is_show; 
        this.pageData.formulaData = { ...data.user_loss_formula?.data };
        this.converToTableData();
    }

    onQuery() {
        this.pageData.loading = true;
        const { agent_user_id, dateArr } = this.pageData.search;
        const [ from_date, to_date ] = dateArr;

        Object.assign(this.pageData.listQuery, {
            agent_user_id: agent_user_id,
            from_date: from_date,
            to_date: to_date,
        })
        this.api_user_var_agent_var_statistic_promotion();
    }

    api_user_var_agent_var_statistic_promotion() {
        this.sendNotification(net.HttpType.api_user_var_agent_var_statistic_promotion, objectRemoveNull(this.pageData.listQuery));
    }

    converToTableData() {
        const {
            total_directly_users,
            total_group_users,
            directly_users,
            group_users,
            directly_first_recharge_count,
            group_first_recharge_count,
            directly_recharge_count,
            group_recharge_count,
            directly_recharge,
            group_recharge,
            directly_exchange_count,
            group_exchange_count,
            directly_exchange,
            group_exchange,
            directly_commission,
            group_commission,
            directly_gift_gold,
            group_gift_gold,
            directly_backwater_gold,
            group_backwater_gold,
            directly_total_bet,
            group_total_bet,
            directly_total_water,
            group_total_water,
            directly_total_win_loss,
            group_total_win_loss,
            directly_bonus_pool,
            group_bonus_pool,
            total_directly_profit,
            total_group_profit,
            directly_recharge_fee,
            group_recharge_fee,
            directly_exchange_fee,
            group_exchange_fee,
            directly_commission_2,
            group_commission_2,
            directly_backwater_2,
            group_backwater_2,
            directly_bet_2,
            group_bet_2,
            directly_water_2,
            group_water_2,
            directly_win_loss_2,
            group_win_loss_2,
            directly_bonus_pool_2,
            group_bonus_pool_2,
            directly_commission_4,
            group_commission_4,
            directly_backwater_4,
            group_backwater_4,
            directly_bet_4,
            group_bet_4,
            directly_water_4,
            group_water_4,
            directly_win_loss_4,
            group_win_loss_4,
            directly_bonus_pool_4,
            group_bonus_pool_4,
            directly_commission_8,
            group_commission_8,
            directly_backwater_8,
            group_backwater_8,
            directly_bet_8,
            group_bet_8,
            directly_water_8,
            group_water_8,
            directly_win_loss_8,
            group_win_loss_8,
            directly_bonus_pool_8,
            group_bonus_pool_8,
            directly_commission_16,
            group_commission_16,
            directly_backwater_16,
            group_backwater_16,
            directly_bet_16,
            group_bet_16,
            directly_water_16,
            group_water_16,
            directly_win_loss_16,
            group_win_loss_16,
            directly_bonus_pool_16,
            group_bonus_pool_16,
            directly_commission_32,
            group_commission_32,
            directly_backwater_32,
            group_backwater_32,
            directly_bet_32,
            group_bet_32,
            directly_water_32,
            group_water_32,
            directly_win_loss_32,
            group_win_loss_32,
            directly_bonus_pool_32,
            group_bonus_pool_32,
            directly_commission_64,
            group_commission_64,
            directly_backwater_64,
            group_backwater_64,
            directly_bet_64,
            group_bet_64,
            directly_water_64,
            group_water_64,
            directly_win_loss_64,
            group_win_loss_64,
            directly_bonus_pool_64,
            group_bonus_pool_64,
            directly_commission_128,
            group_commission_128,
            directly_backwater_128,
            group_backwater_128,
            directly_bet_128,
            group_bet_128,
            directly_water_128,
            group_water_128,
            directly_win_loss_128,
            group_win_loss_128,
            directly_bonus_pool_128,
            group_bonus_pool_128,
        } = this.pageData.list.statistic_info;

        this.pageData.tableData.length = 0;

        this.pageData.tableData.push(
            { name: '人数', directly: total_directly_users, group: total_group_users },
            { name: '新增', directly: directly_users, group: group_users },
            { name: '首充人数', directly: directly_first_recharge_count, group: group_first_recharge_count },
            { name: '充值笔数', directly: directly_recharge_count, group: group_recharge_count },
            { name: '充值金额', directly: directly_recharge, group: group_recharge },
            { name: '兑换笔数', directly: directly_exchange_count, group: group_exchange_count },
            { name: '兑换金额', directly: directly_exchange, group: group_exchange },
            { name: '推广佣金', directly: directly_commission, group: group_commission },
            { name: '平台赠送', directly: directly_gift_gold, group: group_gift_gold },
            { name: '实时挖矿', directly: directly_backwater_gold, group: group_backwater_gold },
            { name: '总投注', directly: directly_total_bet, group: group_total_bet },
            { name: '总流水', directly: directly_total_water, group: group_total_water },
            { name: '总输赢', directly: directly_total_win_loss, group: group_total_win_loss },
            { name: '奖池分红 ', directly: directly_bonus_pool, group: group_bonus_pool },
            { name: '总盈利 ', directly: total_directly_profit, group: total_group_profit },
            { name: '充值手续费 ', directly: directly_recharge_fee, group: group_recharge_fee },
            { name: '提现手续费 ', directly: directly_exchange_fee, group: group_exchange_fee },
            { name: '棋牌佣金 ', directly: directly_commission_2, group: group_commission_2 },
            { name: '棋牌挖矿 ', directly: directly_backwater_2, group: group_backwater_2 },
            { name: '棋牌投注 ', directly: directly_bet_2, group: group_bet_2 },
            { name: '棋牌流水 ', directly: directly_water_2, group: group_water_2 },
            { name: '棋牌输赢 ', directly: directly_win_loss_2, group: group_win_loss_2 },
            { name: '棋牌奖池 ', directly: directly_bonus_pool_2, group: group_bonus_pool_2 },
            { name: '彩票佣金 ', directly: directly_commission_4, group: group_commission_4 },
            { name: '彩票挖矿 ', directly: directly_backwater_4, group: group_backwater_4 },
            { name: '彩票投注 ', directly: directly_bet_4, group: group_bet_4 },
            { name: '彩票流水 ', directly: directly_water_4, group: group_water_4 },
            { name: '彩票输赢 ', directly: directly_win_loss_4, group: group_win_loss_4 },
            { name: '彩票奖池 ', directly: directly_bonus_pool_4, group: group_bonus_pool_4 },
            { name: '捕鱼佣金 ', directly: directly_commission_8, group: group_commission_8 },
            { name: '捕鱼挖矿 ', directly: directly_backwater_8, group: group_backwater_8 },
            { name: '捕鱼投注 ', directly: directly_bet_8, group: group_bet_8 },
            { name: '捕鱼流水 ', directly: directly_water_8, group: group_water_8 },
            { name: '捕鱼输赢 ', directly: directly_win_loss_8, group: group_win_loss_8 },
            { name: '捕鱼奖池 ', directly: directly_bonus_pool_8, group: group_bonus_pool_8 },
            { name: '电子佣金 ', directly: directly_commission_16, group: group_commission_16 },
            { name: '电子挖矿 ', directly: directly_backwater_16, group: group_backwater_16 },
            { name: '电子投注 ', directly: directly_bet_16, group: group_bet_16 },
            { name: '电子流水 ', directly: directly_water_16, group: group_water_16 },
            { name: '电子输赢 ', directly: directly_win_loss_16, group: group_win_loss_16 },
            { name: '电子奖池 ', directly: directly_bonus_pool_16, group: group_bonus_pool_16 },
            { name: '真人佣金', directly: directly_commission_32, group: group_commission_32 },
            { name: '真人挖矿', directly: directly_backwater_32, group: group_backwater_32 },
            { name: '真人投注', directly: directly_bet_32, group: group_bet_32 },
            { name: '真人流水', directly: directly_water_32, group: group_water_32 },
            { name: '真人输赢', directly: directly_win_loss_32, group: group_win_loss_32 },
            { name: '真人奖池', directly: directly_bonus_pool_32, group: group_bonus_pool_32 },
            { name: '体育电竞佣金', directly: directly_commission_64, group: group_commission_64 },
            { name: '体育电竞挖矿', directly: directly_backwater_64, group: group_backwater_64 },
            { name: '体育电竞投注', directly: directly_bet_64, group: group_bet_64 },
            { name: '体育电竞流水', directly: directly_water_64, group: group_water_64 },
            { name: '体育电竞输赢', directly: directly_win_loss_64, group: group_win_loss_64 },
            { name: '体育电竞奖池', directly: directly_bonus_pool_64, group: group_bonus_pool_64 },
            { name: '链游佣金', directly: directly_commission_128, group: group_commission_128 },
            { name: '链游挖矿', directly: directly_backwater_128, group: group_backwater_128 },
            { name: '链游投注', directly: directly_bet_128, group: group_bet_128 },
            { name: '链游流水', directly: directly_water_128, group: group_water_128 },
            { name: '链游输赢', directly: directly_win_loss_128, group: group_win_loss_128 },
            { name: '链游奖池', directly: directly_bonus_pool_128, group: group_bonus_pool_128 },
        )
    }
}
