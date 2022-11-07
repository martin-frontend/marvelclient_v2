import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogCoinExchangeMediator from "../mediator/DialogCoinExchangeMediator";
import DialogCoinExchangeProxy from "../proxy/DialogCoinExchangeProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_game_rate from "@/views/dialog_game_rate";

@Component
export default class DialogCoinExchange extends AbstractView {
    LangUtil = LangUtil;
    plat_coins = GamePlatConfig.config.plat_coins;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: DialogCoinExchangeProxy = this.getProxy(DialogCoinExchangeProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;
    exchangeData = this.pageData.exchangeData;

    get optionsCoin1() {
        const keys = Object.keys(this.plat_coins);
        const obj: any = {};
        for (const key of keys) {
            obj[key] = { name: key };
        }
        return obj;
    }

    get optionsCoin2(): any {
        const keys = Object.keys(this.plat_coins);
        const obj: any = {};
        for (const key of keys) {
            if (key != this.form.from_coin_name_unique) obj[key] = { name: key };
        }
        return obj;
    }

    get gold_info() {
        return this.selfProxy.userInfo.gold_info || {};
    }

    @Watch("form.from_coin_name_unique")
    onWatchFromCoin() {
        this.form.amount = 0;
        if (this.form.to_coin_name_unique == "" || this.form.to_coin_name_unique == this.form.from_coin_name_unique) {
            const keys = Object.keys(this.plat_coins);
            this.form.to_coin_name_unique = keys.find((key) => key != this.form.from_coin_name_unique) || "";
        } else {
            this.myProxy.api_user_coin_exchange_scale_var();
        }
    }

    @Watch("form.to_coin_name_unique")
    onWatchToCoin() {
        this.myProxy.api_user_coin_exchange_scale_var();
    }

    @Watch("form.amount")
    onWatchAmount() {
        this.myProxy.api_user_coin_exchange_scale_var();
    }

    constructor() {
        super(DialogCoinExchangeMediator);
        this.selfProxy.userInfo.gold_info?.plat_money;
    }

    onAll() {
        //@ts-ignore
        this.form.amount = this.gold_info[this.form.from_coin_name_unique].plat_money;
    }

    onGameRate() {
        dialog_game_rate.show();
    }

    onExchange() {
        this.myProxy.api_user_coin_exchange_var();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
        }
    }
}
