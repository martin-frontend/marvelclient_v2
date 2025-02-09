import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class TabExchange extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    myProxy = PanelUtil.getProxy_recharge;
    addressBooProxy = PanelUtil.getProxy_addressBook;
    pageData = this.myProxy.exchangeProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    public get isUnityExchange(): boolean {
        const { coin_name_unique } = this.form;
        return this.pageData.methodList[coin_name_unique] && this.pageData.methodList[coin_name_unique].payment_method_type == 7;
    }

    mounted() {
        this.onWatchNetwwork();
    }

    @Watch("form.block_network_id")
    onWatchNetwwork() {
        const coinObj = this.pageData.methodList[this.form.coin_name_unique];
        if (coinObj) {
            const obj = coinObj.options[this.form.block_network_id];
            if (!this.isUnityExchange) {
                this.form.exchange_channel_id = obj.exchange_channel_id;
                this.form.payment_method_type = obj.payment_method_type;
            }
            this.form.requires = obj.requires;
            if (this.isUnityExchange) {
                if (obj[0]) {
                    this.form.requires = obj[0].requires;
                    this.form.exchange_channel_id = obj[0].exchange_channel_id;
                    this.form.payment_method_type = obj[0].payment_method_type;
                }
            }
            console.log("---设置 兑换的类型", this.form.requires);
        }
    }

    @Watch("form.coin_name_unique")
    onWatchCoinName() {
        const { methodList } = this.pageData;
        const coin_name_unique = this.form.coin_name_unique;
        const keys = Object.keys(methodList[coin_name_unique].options);

        // 默认选择trc20
        let block_network_id = keys[0];
        for (const key of keys) {
            if (methodList[coin_name_unique].options[key].name && methodList[coin_name_unique].options[key].name.toLowerCase() == "trc20") {
                block_network_id = key;
            }
        }
        this.form.block_network_id = block_network_id;
        this.form.exchange_channel_method_id = methodList[coin_name_unique].options[block_network_id].exchange_channel_method_id;
        // 地址簿
        this.addressBooProxy.pageData.listQuery.coin_name_unique = this.form.coin_name_unique;
        this.form.requires = methodList[coin_name_unique].options[block_network_id].requires;
    }
}
