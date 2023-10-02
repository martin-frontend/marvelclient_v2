import PanelUtil from "@/_skin005/core/PanelUtil";

/*
 * @Author: custer custer@xx.xx
 * @Date: 2023-09-27 11:02:10
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-29 15:42:47
 * @FilePath: /marvelclient_v2/src/_skin005/views/page_recharge/proxy/CurrencyExchangeProxy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default class CurrencyExchangeProxy extends puremvc.Proxy {
    static NAME = "CurrencyExchangeProxy";

    public onRegister(): void {
        this.api_user_currency_conversion_index();
    }

    pageData = {
        rateInfo: <any>[],
        form: {
            currency_conversion_id: 0,
            currency_conversion_rate: 0,
            amount: "0",
            from_coin: "",
            to_coin: "",
        },
    };

    api_user_currency_conversion_index() {
        net.Http.request({}, net.HttpType.api_user_currency_conversion_index).then((result: any) => {
            const rateInfo = (this.pageData.rateInfo = result.data);
            this.pageData.form.from_coin = rateInfo[0].from_coin;
            this.pageData.form.to_coin = rateInfo[0].to_coin;
        });
    }

    api_user_currency_conversion_create_order() {
        PanelUtil.showAppLoading(true);
        const { from_coin, to_coin } = this.pageData.form;
        const item = this.pageData.rateInfo.find((item: any) => item.from_coin == from_coin && item.to_coin == to_coin);
        if (item) {
            this.pageData.form.currency_conversion_id = item.id;
            this.pageData.form.currency_conversion_rate = item.rate;
        }

        net.Http.request(this.pageData.form, net.HttpType.api_user_currency_conversion_create_order)
            .then((result: any) => {
                if (result.data) {
                    this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify([1, 2, 3]) });
                }
            })
            .finally(() => {
                PanelUtil.showAppLoading(false);
            });
    }
}
