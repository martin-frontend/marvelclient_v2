import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";

export default class DialogPromotionFloorProxy extends puremvc.Proxy {
    static NAME = "DialogPromotionFloorProxy";

    /**参数 */
    parameter: any = {
        user_id: core.user_id,
        agent_user_id: 0,
        vendor_type_0: 0, // 全部
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
        amount: "0",
        origin_amount: "",
        range: {
            min: "",
            max: "",
        },
        temp_amount: "",
    };

    resetData() {
        this.pageData.origin_amount = "";
        this.pageData.temp_amount = "";
        Object.assign(this.pageData.range, {
            min: "",
            max: "",
        });
    }

    setSelectedFloorData(agent_user_id: number, val: number): void {
        this.parameter.agent_user_id = agent_user_id;
        this.pageData.amount = val.toString();
        this.pageData.temp_amount = val.toString();
    }

    setData(data: any) {
        this.pageData.loading = false;
        if (data) {
            dialog_message.warn(LangUtil("设置成功"));
            this.pageData.bShow = false;
        }
    }

    setFloorRange(data: any) {
        this.pageData.origin_amount = this.pageData.temp_amount;
        Object.assign(this.pageData.range, data[0]);
    }

    amountToParameter(): void {
        // 目前只設定全部
        this.parameter.vendor_type_0 = Number(this.pageData.amount);
        // this.parameter.vendor_type_2 = Number(this.pageData.amount);
        // this.parameter.vendor_type_4 = Number(this.pageData.amount);
        // this.parameter.vendor_type_8 = Number(this.pageData.amount);
        // this.parameter.vendor_type_16 = Number(this.pageData.amount);
        // this.parameter.vendor_type_32 = Number(this.pageData.amount);
        // this.parameter.vendor_type_64 = Number(this.pageData.amount);
        // this.parameter.vendor_type_128 = Number(this.pageData.amount);
    }

    /**--代理推广--设置直属保底*/
    api_user_var_agent_var_update() {
        this.amountToParameter();
        this.parameter.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_agent_var_update, this.parameter);
    }
}
