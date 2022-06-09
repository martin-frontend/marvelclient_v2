import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";

export default class FagProxy extends AbstractProxy {
    static NAME = "GameProxy";

    /**--其它--常见问题数据*/
    api_plat_fag_index() {
        this.sendNotification(net.HttpType.api_plat_fag_index, { module: JSON.stringify([1, 2, 3]) });
    }
    // 1-推广赚钱|2-游戏挖矿|3-质押分红
    qData = <any>{
        type1: null,
        type2: null,
        type3: null,
    };

    setData(data: any): void {
        console.warn("data>>>", data);
        this.qData.type1 = data.faqs.filter((item: any) => item.module == 1);
        this.qData.type2 = data.faqs.filter((item: any) => item.module == 2);
        this.qData.type3 = data.faqs.filter((item: any) => item.module == 3);
    }
}
