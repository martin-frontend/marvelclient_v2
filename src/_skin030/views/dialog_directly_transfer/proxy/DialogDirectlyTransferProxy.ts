import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogDirectlyTransferProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyTransferProxy";
    isOpenWalletMenu: boolean = false;

    playerInfo = {
        user_id: 0,
        nick_name: "",
        gold_info: <any>{},
        state: "98",
    };

    formData = {
        user_id: core.user_id,
        direct_user_id: 0,
        gold: "",
        coin_name_unique: "",
    };

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        isAddMode: false, //是否为增加钱的模式
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        playerInfo: <any>{
            //当前用户自己身上的金币情况  只针对 增加钱的情况
            user_id: 0,
            nick_name: "",
            gold_info: <any>{},
            state: "98",
        },

        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
            gold_info: <any>{},
        });
        Object.assign(this.formData, {
            direct_user_id: 0,
            direct_nick_name: "",
            gold: "",
            coin_name_unique: "",
        });
    }
    setUserData(data: any) {
        Object.assign(this.pageData.playerInfo, data);
        const coinKeys = Object.keys(this.playerInfo.gold_info);
        if (!this.formData.coin_name_unique) this.formData.coin_name_unique = coinKeys[0];
    }

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.playerInfo, data);
        const coinKeys = Object.keys(this.playerInfo.gold_info);
        if (!this.formData.coin_name_unique) this.formData.coin_name_unique = coinKeys[0];

        this.formData.direct_user_id = this.playerInfo.user_id;
    }
    /**离开页面时调用 */
    leave() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }
    // 直属扣款 信息
    api_user_var_agent_direct_deduction() {
        this.formData.user_id = core.user_id;
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_agent_direct_deduction, objectRemoveNull(this.formData));
        this.formData.gold = "";
    }

    //扣款的回调
    agent_direct_deduction_call_back(msg: any) {
        const str = LangUtil("扣款成功！金额：{0} {1}！", msg.actual_deduction_gold, msg.coin_name_unique);
        PanelUtil.message_alert({ message: str, okFun: () => {} });
    }
    // 直属加钱 信息
    api_user_var_agent_credit_transfer() {
        this.formData.user_id = core.user_id;
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_agent_credit_transfer, objectRemoveNull(this.formData));
        this.formData.gold = "";
    }

    //加钱的回调
    api_user_var_agent_credit_transfer_call_back(msg: any) {
        const str = LangUtil("加钱成功！金额：{0} {1}！", msg.actual_deduction_gold, msg.coin_name_unique);
        PanelUtil.message_alert({ message: str, okFun: () => {} });
        this.api_user_show_var(); //刷新当前玩家金币
    }

    api_user_show_var() {
        this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify([2]) });
    }
}
