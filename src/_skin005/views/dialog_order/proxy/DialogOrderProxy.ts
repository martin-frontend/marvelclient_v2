import PanelUtil from "@/_skin005/core/PanelUtil";
import Timezone from "@/core/Timezone";
import GameConfig from "@/core/config/GameConfig";
import Vue from "vue";

export default class DialogOrderProxy extends puremvc.Proxy {
    static NAME = "DialogOrderProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        data: {
            tournament_name: "",
            option_name: "",
            market_name: "",
            match_name: "",
            is_inplay: false,
            bet_odds: "",
            order_status: "",
            stake_amount: "",
            max_win_amount: "",
            order_id: "",
            create_time: "",
            bet_type: "",
            settle_time: "",
            settle_result: "",
            settle_amount: "",
            game_info: <any>{
                betList: <any>[],
                cashOutCount: 0,
                orderStatus: 0,
                cashOutPayoutStake: "",
                cashOutTotalStake: "",
                settleStatus:0,
            },
        },
        itemData: <any>null,
        url: "",
        isHaveData: false,
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.data, {
            tournament_name: "",
            option_name: "",
            market_name: "",
            match_name: "",
            is_inplay: false,
            bet_odds: "",
            order_status: "",
            stake_amount: "",
            max_win_amount: "",
            order_id: "",
            create_time: "",
            bet_type: "",
            settle_time: "",
            settle_result: "",
            settle_amount: "",
        });

        this.pageData.url = "";
        this.pageData.itemData = null;
        this.pageData.isHaveData = false;
    }

    setGameinfo(data: any) {
        console.warn("设置gameinfo 数据");
        if (!data) {
            this.pageData.data.game_info = null;
            return;
        }
        Object.assign(this.pageData.data.game_info, data);
    }
    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.pageData.data, data);

        //如果是列表，使用以下数据，否则删除
        // Object.assign(this.pageData.pageInfo, data.pageInfo);
        // this.pageData.list = data.list;
    }

    api_vendor_var_bet_log_detail(order_no: any, vendor_id: any = 0) {
        PanelUtil.showAppLoading(true);
        let my_vendor_id = vendor_id;
        if (!my_vendor_id) {
            my_vendor_id = GameConfig.config.SportVendorId;
        }
        const formCopy = <any>{
            order_no: order_no,
            vendor_id: my_vendor_id,
            daynight_type: Vue.vuetify.framework.theme.dark ? "2" : "1",
        };
        if (!Timezone.Instance.isNotUseTimezone) {
            formCopy.timezone = Timezone.Instance.timezoneOffset;
        }
        this.sendNotification(net.HttpType.api_vendor_var_bet_log_detail, formCopy);
    }
}
