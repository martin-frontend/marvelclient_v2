import AbstractView from "@/core/abstract/AbstractView";

import { Watch, Component } from "vue-property-decorator";
import DialogRecordMineMediator from "../mediator/DialogRecordMineMediator";
import DialogRecordMineProxy from "../proxy/DialogRecordMineProxy";
import Assets from "@/assets/Assets";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";
import { changeDateShow } from "@/core/global/Functions";

@Component
export default class DialogRecordMine extends AbstractView {
    myProxy: DialogRecordMineProxy = this.getProxy(DialogRecordMineProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    LangUtil = LangUtil;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogRecordMineMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_backwater();
        }
    }

    @Watch("$xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_backwater();
        }
    }

    /** 详情 测试 数据 */
    setTestData() {
        const obj = {
            settlement_from_date: "2023-01-18 15:28:33",
            total_water: 123451,
            total_backwater: {
                USDT: 654,
                CNY: 222,
            },
            detail: [
                {
                    vendor_type: 2,
                    water: 1234,
                    main_coin_name_unique: "USDT",
                    main_coin_backwater_rate: 0.02,
                    reward_coin_name_unique: "CNY",
                    reward_coin_backwater_rate: 0.03,
                    main_coin_backwater: 13545,
                    reward_coin_backwater: 5655,
                },
                {
                    vendor_type: 2,
                    water: 1234,
                    main_coin_name_unique: "USDT",
                    main_coin_backwater_rate: 0.02,
                    reward_coin_name_unique: "CNY",
                    reward_coin_backwater_rate: 0.03,
                    main_coin_backwater: 13545,
                    reward_coin_backwater: 5655,
                },
                {
                    vendor_type: 2,
                    water: 1234,
                    main_coin_name_unique: "USDT",
                    main_coin_backwater_rate: 0.02,
                    reward_coin_name_unique: "CNY",
                    reward_coin_backwater_rate: 0.03,
                    main_coin_backwater: 13545,
                    reward_coin_backwater: 5655,
                },
                {
                    vendor_type: 2,
                    water: 1234,
                    main_coin_name_unique: "USDT",
                    main_coin_backwater_rate: 0.02,
                    reward_coin_name_unique: "CNY",
                    reward_coin_backwater_rate: 0.03,
                    main_coin_backwater: 13545,
                    reward_coin_backwater: 5655,
                },
                {
                    vendor_type: 2,
                    water: 1234,
                    main_coin_name_unique: "USDT",
                    main_coin_backwater_rate: 0.02,
                    reward_coin_name_unique: "CNY",
                    reward_coin_backwater_rate: 0.03,
                    main_coin_backwater: 13545,
                    reward_coin_backwater: 5655,
                },
                {
                    vendor_type: 2,
                    water: 1234,
                    main_coin_name_unique: "USDT",
                    main_coin_backwater_rate: 0.02,
                    reward_coin_name_unique: "CNY",
                    reward_coin_backwater_rate: 0.03,
                    main_coin_backwater: 13545,
                    reward_coin_backwater: 5655,
                },
            ],
        };
        return obj;
    }

    handlerDetail(item: any) {
        this.myProxy.api_user_var_backwater_var(item.backwater_id);

        //PanelUtil.openpanel_record_mine_detail(this.setTestData());
    }

    /**分页 */
    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_var_backwater();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }

    getDateTime(data: any) {
        return changeDateShow(data);
    }
    transformMoney(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, false, false);
    }
}
