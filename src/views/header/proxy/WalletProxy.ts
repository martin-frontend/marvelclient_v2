import AbstractProxy from "@/core/abstract/AbstractProxy";

export default class WalletProxy extends AbstractProxy{
    static NAME = "WalletProxy";

    coinIcon = {
        "USDT": require(`@/assets/icon/coin/icon_usdt.png`),
        "ETH": require(`@/assets/icon/coin/icon_usdt.png`),
        "BTC": require(`@/assets/icon/coin/icon_usdt.png`),
        "BNB": require(`@/assets/icon/coin/icon_usdt.png`),
    }

    /**钱包信息 */
    gold_info = <any>{};
    /**当前选择 */
    selectKey = "";

    setGoldInfo(data: any) {
        this.gold_info = data;
        const keys = Object.keys(data);
        if (this.selectKey == "") this.selectKey = keys[0];
    }
}