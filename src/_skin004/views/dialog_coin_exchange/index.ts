import GamePlatConfig from "@/core/config/GamePlatConfig";
import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogCoinExchangeProxy from "./proxy/DialogCoinExchangeProxy";
import DialogCoinExchange from "./views/DialogCoinExchange.vue";

function show(from_coin_name_unique: string) {
    DialogMount(DialogCoinExchange);
    const proxy: DialogCoinExchangeProxy = getProxy(DialogCoinExchangeProxy);
    proxy.resetForm();
    proxy.pageData.form.from_coin_name_unique = from_coin_name_unique;

    const coinKeys = Object.keys(GamePlatConfig.config.plat_coins);
    proxy.pageData.form.to_coin_name_unique = coinKeys.find((key) => key != from_coin_name_unique) || "";

    proxy.pageData.bShow = true;
}

export default { show };
