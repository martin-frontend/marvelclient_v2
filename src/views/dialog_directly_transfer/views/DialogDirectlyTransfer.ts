import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyTransferMediator from "../mediator/DialogDirectlyTransferMediator";
import DialogDirectlyTransferProxy from "../proxy/DialogDirectlyTransferProxy";
import LangUtil from "@/core/global/LangUtil";

import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";



@Component
export default class DialogDirectlyTransfer extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyTransferProxy = this.getProxy(DialogDirectlyTransferProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    gameProxy: GameProxy = this.getProxy(GameProxy);
    GamePlatConfig = GamePlatConfig;
    isOpenWalletMenu = this.myProxy.isOpenWalletMenu;
    /**当前选择的钱包类型 */
    coin_name_unique: string = "";
    pageData = this.myProxy.pageData;

    playerInfo = this.myProxy.playerInfo;

    formData = this.myProxy.formData;

    constructor() {
        super(DialogDirectlyTransferMediator);
    }

    setCoin(coin_name_unique: string) {
        this.formData.coin_name_unique = coin_name_unique;
        this.formData.gold = "";
    }

    onItemClick(key: string) {
        this.setCoin(key);
    }

    onClose() {
        this.pageData.bShow = false;
    }
    //确定扣款
    onClickSure()
    {
        this.myProxy.api_user_var_agent_direct_deduction();
    }
    search() {

    }
    
    onClickGetAll()
    {
        this.formData.gold = this.playerInfo.gold_info[this.formData.coin_name_unique].sum_money
    }
    get isChecked(): boolean {
        if (!this.formData.gold)
        {
            return false;
        }
        const num = parseFloat(this.formData.gold)
        if ( num <= 0)
        {   
            return false;
        }

        if (this.playerInfo.gold_info[this.formData.coin_name_unique] && num > this.playerInfo.gold_info[this.formData.coin_name_unique].sum_money)
        {
            return false;
        }
        return true;
    }

    onUsernameBlur()
    {
        
    }
    handlerUpdate(val: any) {

    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
}
