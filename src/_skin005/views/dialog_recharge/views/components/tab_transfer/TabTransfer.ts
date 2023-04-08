import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class TabTransfer extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.transferProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    mounted() {
        const safetyLink = document.getElementById("safetyLink");
        if (safetyLink) {
            safetyLink.addEventListener("click", () => {
                PanelUtil.openpanel_safety_center();
            });
        }
    }

    get methodList() {
        const obj: any = {};
        for (const key of Object.keys(this.plat_coins)) {
            obj[key] = { name: key };
        }
        return obj;
    }

    get bindHtml() {
        return LangUtil(
            "为保证您的资金安全，请先在 {0} 绑定谷歌两步验证。",
            `<a id="safetyLink" class="text-decoration-underline textYellow--text">${LangUtil("安全中心")}</a>`
        );
    }

    onChange() {
        this.pageData.form.gold = "";
    }

    get isChecked(): boolean {
        const { gold, coin_name_unique, password_gold, to_user_id } = this.form;
        if (gold != "" && password_gold != "" && to_user_id != "") {
            const amount_num = parseFloat(gold);
            if (amount_num > 0 && amount_num <= this.myProxy.transferProxy.gold_info[coin_name_unique].sum_money) {
                return true;
            }
        }
        return false;
    }

    get balance() {
        if (this.myProxy.transferProxy.gold_info[this.form.coin_name_unique]) {
            return this.myProxy.transferProxy.gold_info[this.form.coin_name_unique].plat_money;
        }
        return "0.00";
    }

    onWallet() {
        //打开平台钱包
        //dialog_wallet.show();
        PanelUtil.openpanel_wallet();
    }

    onAll() {
        if (this.myProxy.transferProxy.gold_info[this.form.coin_name_unique]) {
            this.form.gold = this.myProxy.transferProxy.gold_info[this.form.coin_name_unique].plat_money;
        } else {
            this.form.gold = "0.00";
        }
    }

    onSetPassword() {
        const { phone, email } = this.selfProxy.userInfo;
        if (phone || email) {
            //dialog_trade_password.show();
            PanelUtil.openpanel_trade_password();
        } else {
            PanelUtil.message_alert(LangUtil("请先绑定邮箱或者手机"));
        }
    }

    onSubmit() {
        PanelUtil.message_confirm({
            message: "确认划转",
            okFun: () => {
                this.myProxy.transferProxy.api_user_var_gold_transfer();
            },
        });
    }
}
