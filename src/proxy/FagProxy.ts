import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";

export default class FagProxy extends AbstractProxy {
    static NAME = "FagProxy";

    public onRegister(): void {
        this.api_plat_fag_index();
    }

    // 1-推广赚钱|2-游戏挖矿|3-质押分红|4-swap|5-亏损分红
    qData = <any>{
        type1: [],
        type2: [],
        type3: [],
        type4: [],
        type5: [],
    };

    setData(data: any) {
        this.qData.type1 = data.faqs.filter((item: any) => item.module == 1);
        this.qData.type2 = data.faqs.filter((item: any) => item.module == 2);
        this.qData.type3 = data.faqs.filter((item: any) => item.module == 3);
        this.qData.type4 = data.faqs.filter((item: any) => item.module == 4);
        this.qData.type5 = data.faqs.filter((item: any) => item.module == 5);
    }

    /**--其它--常见问题数据*/
    api_plat_fag_index() {
        this.sendNotification(net.HttpType.api_plat_fag_index);
    }
}
