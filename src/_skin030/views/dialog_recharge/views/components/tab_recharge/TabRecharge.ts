import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import { Component, Watch } from "vue-property-decorator";
import MyCanvas from "@/core/ui/MyCanvas";
import PanelUtil from "@/_skin030/core/PanelUtil";

@Component
export default class TabRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    destroyed() {
        super.destroyed();
        this.pageData.address = "";
    }
    // 9 为  聚合 的支付
    public get isUnityRecharge(): boolean {
        const { coin_name_unique } = this.form;
        return this.pageData.methodList[coin_name_unique] && this.pageData.methodList[coin_name_unique].payemthod_id == 9;
    }
    @Watch("form.coin_name_unique")
    onWatchCoinName() {
        const { methodList } = this.pageData;
        const { coin_name_unique } = this.form;
        const keys = Object.keys(methodList[coin_name_unique].options);

        // 默认选择trc20
        let block_network_id = keys[0];
        for (const key of keys) {
            if (methodList[coin_name_unique].options[key].name && methodList[coin_name_unique].options[key].name.toLowerCase() == "trc20") {
                block_network_id = key;
            }
        }

        this.form.block_network_id = block_network_id;
        this.form.recharge_channel_id = methodList[coin_name_unique].options[block_network_id].recharge_channel_id;
        this.form.requires = methodList[coin_name_unique].options[block_network_id].requires;
        this.myProxy.rechargeProxy.api_user_var_recharge_address();
    }
}
