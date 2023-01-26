import LangUtil from "@/core/global/LangUtil";
import dialog_login from "@/_skin004/views/dialog_login";
import dialog_message_box from "@/views/dialog_message_box";
import getProxy from "@/core/global/getProxy";
import GameProxy from "@/proxy/GameProxy";

export default function LoginEnter(fun: any) {
    if (core.user_id) {
        fun();
    } else {
        dialog_message_box.confirm({
            message: LangUtil("请您登录游戏"),
            okFun: dialog_login.show,
        });
    }
}

export function EnterGame(item: any) {

    const gameProxy: GameProxy = getProxy(GameProxy);
    // const { coin_name_unique } = gameProxy;
    // if (coin_name_unique != item.settle_coin_name_unique) {
    //     const str = LangUtil("您当前使用的货币为{0}将会折算成等价的{1}进入游戏", coin_name_unique, item.settle_coin_name_unique);
    //     dialog_message_box.confirm({
    //         message: str,
    //         okFun: () => {
    //             gameProxy.api_vendor_var_ori_product_show_var(item);
    //         }
    //     });
    // }
    // else
    gameProxy.api_vendor_var_ori_product_show_var(item);

}
