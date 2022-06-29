import getProxy from "@/core/global/getProxy";
import GameProxy from "@/proxy/GameProxy";

export default class DialogAddressBookProxy extends puremvc.Proxy {
    static NAME = "DialogAddressBookProxy";

    pageData = {
        loading: false,
        bShow: false,
        methodList: <any>{},
        form: {
            amount: "",
            exchange_channel_id: 0,
            payment_method_type: 0,

            coin_name_unique: "",
            block_network_id: "",
            account: "",

            password: "",
        },
    };

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        const keys = Object.keys(data);

        const gameProxy: GameProxy = getProxy(GameProxy);
        let coin_name_unique = gameProxy.coin_name_unique;
        if (keys.indexOf(coin_name_unique) == -1) {
            coin_name_unique = keys[0];
        }

        if (coin_name_unique) {
            this.pageData.form.coin_name_unique = coin_name_unique;
            const optionsKeys = Object.keys(data[coin_name_unique].options);
            if (optionsKeys[0]) {
                this.pageData.form.block_network_id = optionsKeys[0];
            }
        }
    }

    api_user_var_exchange_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_exchange_method_list, { plat_id: core.plat_id });
    }
}
