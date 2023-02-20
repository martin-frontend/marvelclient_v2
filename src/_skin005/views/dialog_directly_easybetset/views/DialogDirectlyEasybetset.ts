import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";

import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyEasybetsetMediator from "../mediator/DialogDirectlyEasybetsetMediator";
import DialogDirectlyEasybetsetProxy from "../proxy/DialogDirectlyEasybetsetProxy";
import LangUtil from "@/core/global/LangUtil";

import GamePlatConfig from "@/core/config/GamePlatConfig";
import ScrollUtil, { scrollUtil_div } from "@/core/global/ScrollUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

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
        if (!this.myProxy.formData.market_type_config) {
            return false;
        }
        return this.myProxy.sclectChangeVaule(this.input_market_config);
        //return true;
    }

    public get listValue(): any {
        //return this.myProxy.playerInfo.vendor_config.market_type_config[this.formData.coin_name_unique]
        return this.myProxy.playerInfo.vendor_config.market_type_config[this.formData.coin_name_unique];
    }

    public get input_market_config(): any {
        //console.log(" 取 值  ---- " , this.myProxy.formData.market_type_config);
        return this.myProxy.formData.market_type_config || [];
    }

    public get isHaveValue(): boolean {
        if (this.myProxy.playerInfo.vendor_config.market_type_config[this.formData.coin_name_unique]) {
            //console.log("有------值");
            return true;
        }
        //console.log("没有值");
        return false;
    }
    public get getSrcPath(): string {
        let src = "";
        if (GamePlatConfig.config.plat_coins[this.formData.coin_name_unique]) {
            src = GamePlatConfig.config.plat_coins[this.formData.coin_name_unique].icon;
        }
        //console.log("路径为 .. " ,src);
        return src;
    }

    //确定扣款
    onClickSure() {
        const newArr = this.myProxy.sclectChangeVaule(this.input_market_config, true);
        //console.log("修改之后的 值为" ,newArr );
        this.myProxy.agent_direct_user_update(newArr);
    }

    onChangeItem(key: string) {
        scrollUtil_div(this.$refs.scrollObj, 0);
        this.formData.coin_name_unique = key;
        this.myProxy.setCurFormMerketData();
    }
    onItemClick(key: string) {
        if (this.isChecked) {
            //如果有修改
            const str = LangUtil("您当前币种设置发生变动，是否需要提交？");
            PanelUtil.message_confirm({
                message: str,
                okFun: () => {
                    this.onClickSure();
                    this.onChangeItem(key);
                },
                cancelFun: () => {
                    this.onChangeItem(key);
                },
            });
        } else {
            this.onChangeItem(key);
        }
    }
    onClose() {
        this.pageData.bShow = false;
        //this.myProxy.resetQuery();
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }
}
