import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch } from "vue-property-decorator";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { amountFormat } from "@/core/global/Functions";

@Component
export default class TabRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;
    amountFormat = amountFormat;
    plat_coins = GamePlatConfig.config.plat_coins;

    mounted() {}

    destroyed() {
        super.destroyed();
        this.pageData.address = "";
    }
    // 9 为  聚合 的支付
    public get isUnityRecharge(): boolean {
        const { coin_name_unique } = this.form;
        console.log("--选择 为--", this.pageData.methodList[coin_name_unique].payemthod_id);
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
        console.log("收到切换", this.form);
    }
}
