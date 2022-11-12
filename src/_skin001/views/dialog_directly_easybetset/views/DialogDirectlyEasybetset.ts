import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyEasybetsetMediator from "../mediator/DialogDirectlyEasybetsetMediator";
import DialogDirectlyEasybetsetProxy from "../proxy/DialogDirectlyEasybetsetProxy";
import LangUtil from "@/core/global/LangUtil";

import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class DialogDirectlyEasybetset extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyEasybetsetProxy = this.getProxy(DialogDirectlyEasybetsetProxy);

    GamePlatConfig = GamePlatConfig;
    pageData = this.myProxy.pageData;
    formData = this.myProxy.formData;
    playerInfo = this.myProxy.playerInfo;
    isOpenWalletMenu = this.myProxy.isOpenWalletMenu;
    constructor() {
        super(DialogDirectlyEasybetsetMediator);
    }
    get isChecked(): boolean {
        
        if (!this.formData.gold) {
            return false;
        }
        return true
        const num = parseFloat(this.formData.gold)
        if (num <= 0) {
            return false;
        }

        if (this.playerInfo.gold_info[this.formData.coin_name_unique] && num > this.playerInfo.gold_info[this.formData.coin_name_unique].sum_money) {
            return false;
        }
        return true;
    }
    //确定扣款
    onClickSure() {

        console.log("确定加钱  按钮",this.formData);//确定加钱

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
        this.myProxy.resetQuery();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            //this.myProxy.resetQuery();
        }
        else {
            this.onClose();
        }
    }
}
