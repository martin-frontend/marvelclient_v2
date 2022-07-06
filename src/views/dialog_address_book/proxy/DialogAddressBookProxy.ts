import getProxy from "@/core/global/getProxy";
import GameProxy from "@/proxy/GameProxy";

export default class DialogAddressBookProxy extends puremvc.Proxy {
    static NAME = "DialogAddressBookProxy";

    pageData = {
        loading: false,
        bShow: false,
        methodList: <any>{},
        listQuery: {
            coin_name_unique: "",
            block_network_id: "",
        },
        list: <any>[1, 2],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        finished: true,
        //加载完毕后调用，手机模式专用
        done: <any>null,
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
            this.pageData.listQuery.coin_name_unique = coin_name_unique;
            const optionsKeys = Object.keys(data[coin_name_unique].options);
            if (optionsKeys[0]) {
                this.pageData.listQuery.block_network_id = optionsKeys[0];
            }
        }
    }

    api_user_var_exchange_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_exchange_method_list, { plat_id: core.plat_id });
    }
}
