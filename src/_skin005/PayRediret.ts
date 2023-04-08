import LangUtil from "@/core/global/LangUtil";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import { GTM } from "./core/GoogleTagManager";

@Component
export default class PayRediret extends Vue {
    LangUtil = LangUtil;
    user_id = core.getQueryVariable("user_id");
    order_no = core.getQueryVariable("order_no");

    data = {
        coin_name_unique: "", // 币种
        gold: "0.00", // 金额
        actual_gold: "0.00",
        order_no: "", // 平台订单号
        third_order_no: "", // 三方订单号
        serial_no: "",
        status: 0, // 状态: 0-待支付|1-成功|2-失败|3-玩家已支付等待确认
        remark: "",
        agent_pay_type: 0,
        created_at: "",
        updated_at: "",
        paymethod_name: "",
    };

    timer = 0;

    mounted() {
        this.timer = setInterval(() => {
            net.Http.request({ order_no: this.order_no }, net.getUrl("api/user/{user_id}/recharge/status", { user_id: this.user_id })).then(
                (result: any) => {
                    Object.assign(this.data, result.data);
                    if (this.data.status == 1 || this.data.status == 2) {
                        clearInterval(this.timer);
                        if (this.user_id) {
                            if (this.data.status == 1) {
                                GTM.repeatDepositSuccess("", this.user_id, parseFloat(this.data.gold), this.data.coin_name_unique);
                            } else if (this.data.status == 2) {
                                GTM.repeatDepositFailed(this.user_id, parseFloat(this.data.gold), this.data.coin_name_unique);
                            }
                        }
                    }
                }
            );
        }, 1000);
    }

    get statusOptions() {
        return {
            0: LangUtil("待支付"),
            1: LangUtil("成功"),
            2: LangUtil("失败"),
            3: LangUtil("玩家已支付等待确认"),
        };
    }

    close() {
        window.close();
    }
}
