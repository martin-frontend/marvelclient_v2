import dialog_message from "@/views/dialog_message";

export default class DialogPromotionFloorProxy extends puremvc.Proxy {
    static NAME = "DialogPromotionFloorProxy";

    /**参数 */
    parameter: any = {
        vendor_type_2: 0, // 棋牌
        vendor_type_4: 0, // 彩票
        vendor_type_8: 0, // 捕鱼
        vendor_type_16: 0, // 电子
        vendor_type_32: 0, // 真人
        vendor_type_64: 0, // 体育
        vendor_type_128: 0, // 电竞
    };

    pageData = {
        loading: false,
        bShow: false,
        amount: 0,
    };

    setSelectedFloorData(data: any): void {
        console.log("DialogPromotionFloorProxy setSelectedFloorData", data);
        this.pageData.amount = data["2"];
    }

    setData(data: any) {
        this.pageData.loading = false;
        if (data.status === 0) {
            dialog_message.warn("设置成功");
            this.pageData.bShow = false;
        }
    }

    amountToParameter(): void {
        for (const k in this.parameter) {
            this.parameter[k] = Number(this.pageData.amount);
        }
    }

    /**--代理推广--设置直属保底*/
    api_user_var_agent_var_update() {
        this.amountToParameter();
        this.sendNotification(net.HttpType.api_user_var_agent_var_update, this.parameter);
    }
}
