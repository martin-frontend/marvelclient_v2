/*
 * @Author: custer custer@xx.xx
 * @Date: 2023-09-25 19:38:04
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-29 12:48:15
 * @FilePath: /marvelclient_v2/src/_skin005/views/page_recharge/views/components/tab_currency_exchange/TabCurrencyExchange.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import getProxy from "@/core/global/getProxy";
import GlobalVar from "@/core/global/GlobalVar";
import CurrencyExchangeProxy from "../../../proxy/CurrencyExchangeProxy";
import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class TabCurrencyExchange extends AbstractView {
    LangUtil = LangUtil;

    selfProxy: SelfProxy = getProxy(SelfProxy);
    myProxy: CurrencyExchangeProxy = getProxy(CurrencyExchangeProxy);
    form = this.myProxy.pageData.form;

    get from_gold_info() {
        const obj: any = {};
        for (const item of this.myProxy.pageData.rateInfo) {
            const gold_info: any = this.selfProxy.userInfo.gold_info;
            if (gold_info) {
                obj[item.from_coin] = gold_info[item.from_coin];
            }
        }
        return obj;
    }

    get to_gold_info() {
        const obj: any = {};
        for (const item of this.myProxy.pageData.rateInfo) {
            if (item.from_coin == this.form.from_coin) {
                const gold_info: any = this.selfProxy.userInfo.gold_info;
                if (gold_info) {
                    obj[item.to_coin] = gold_info[item.to_coin];
                }
            }
        }
        return obj;
    }

    get rate_info() {
        const { from_coin, to_coin } = this.form;
        return this.myProxy.pageData.rateInfo.find((item: any) => item.from_coin == from_coin && item.to_coin == to_coin);
    }

    get is_show_money(): boolean {
        return !(GlobalVar.skin == "skin020");
    }

    get exchangeDigits() {
        if (GameConfig.config.exchangeDigits == undefined) {
            return 2;
        }
        if (GameConfig.config.exchangeDigits == 0) {
            return 0;
        }
        return GameConfig.config.exchangeDigits;
    }

    onItemClick(key: string) {
        this.form.from_coin = key;
        const item = this.myProxy.pageData.rateInfo.find((item: any) => item.from_coin == key);
        if (item) this.form.to_coin = item.to_coin;
    }

    onItemClick1(key: string) {
        this.form.to_coin = key;
    }

    onAll() {
        if (this.from_gold_info[this.form.from_coin]) {
            this.form.amount = this.from_gold_info[this.form.from_coin].plat_money;
        } else {
            this.form.amount = "0.00";
        }
    }

    onSubmit() {
        PanelUtil.message_confirm({
            message: LangUtil("确定要转换吗？"),
            okTxt: LangUtil("确定"),
            okFun: () => {
                this.myProxy.api_user_currency_conversion_create_order();
            },
        });
    }
}
