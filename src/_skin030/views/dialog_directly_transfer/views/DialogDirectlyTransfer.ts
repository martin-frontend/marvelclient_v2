import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyTransferMediator from "../mediator/DialogDirectlyTransferMediator";
import DialogDirectlyTransferProxy from "../proxy/DialogDirectlyTransferProxy";
import LangUtil from "@/core/global/LangUtil";

import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import { amountFormat } from "@/core/global/Functions";

@Component
export default class DialogDirectlyTransfer extends AbstractView {
    LangUtil = LangUtil;
    amountFormat = amountFormat;
    myProxy: DialogDirectlyTransferProxy = this.getProxy(DialogDirectlyTransferProxy);
    selfProxy = PanelUtil.getProxy_selfproxy;
    gameProxy = PanelUtil.getProxy_gameproxy;
    GamePlatConfig = GamePlatConfig;
    isOpenWalletMenu = this.myProxy.isOpenWalletMenu;
    /**当前选择的钱包类型 */
    coin_name_unique: string = "";
    pageData = this.myProxy.pageData;
    userInfo = this.myProxy.pageData.playerInfo; //当前登陆用户的 信息， 只有在 增加模式的 时候 才有效
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

    public get gold_info(): any {
        if (this.pageData.isAddMode) {
            return this.userInfo.gold_info;
        } else {
            return this.playerInfo.gold_info;
        }
    }

    public get insideStr(): string {
        return this.pageData.isAddMode ? "我的余额" : "用户余额";
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
    //确定扣款 和 加钱
    onClickSure() {
        if (this.pageData.isAddMode) {
            //console.log("确定加钱  按钮" ,this.formData);//确定加钱
            this.myProxy.api_user_var_agent_credit_transfer();
        } else {
            this.myProxy.api_user_var_agent_direct_deduction();
        }
    }

    search() {}

    onClickGetAll() {
        this.formData.gold = this.gold_info[this.formData.coin_name_unique].sum_money;
    }
    get isChecked(): boolean {
        if (!this.formData.gold) {
            return false;
        }
        const num = parseFloat(this.formData.gold);
        if (num <= 0) {
            return false;
        }

        if (this.gold_info[this.formData.coin_name_unique] && num > this.gold_info[this.formData.coin_name_unique].sum_money) {
            return false;
        }
        return true;
    }

    onUsernameBlur() {}
    handlerUpdate(val: any) {}

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            //this.myProxy.resetQuery();
            if (this.pageData.isAddMode) {
                this.myProxy.api_user_show_var();
            }
        }
    }
    onDetailBtnClick() {
        console.log("查询记录"); //确定加钱
        if (this.pageData.isAddMode) {
            //dialog_wallet.show(2, 63, this.formData.coin_name_unique);
            PanelUtil.openpanel_wallet(2, 63, this.formData.coin_name_unique);
        } else PanelUtil.openpanel_wallet(2, 62, this.formData.coin_name_unique);
    }
}
