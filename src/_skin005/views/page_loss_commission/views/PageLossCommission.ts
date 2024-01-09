import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageLossCommissionMediator from "../mediator/PageLossCommissionMediator";
import PageLossCommissionProxy from "../proxy/PageLossCommissionProxy";
import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";

import png_infoPC from "@/_skin005/assets/page_loss_commission/info_pc.png";
import png_en_infoPC from "@/_skin005/assets/page_loss_commission/en_info_pc.png";
import png_infoMobile from "@/_skin005/assets/page_loss_commission/info_mobile.png";
import png_en_infoMobile from "@/_skin005/assets/page_loss_commission/en_info_mobile.png";
import png_img1 from "@/_skin005/assets/page_loss_commission/img1.png";

import GamePlatConfig from "@/core/config/GamePlatConfig";
import { amountFormat } from "@/core/global/Functions";
import MyCanvas from "@/core/ui/MyCanvas";
import PanelUtil from "@/_skin005/core/PanelUtil";
import SelfProxy from "@/proxy/SelfProxy";
import CopyUtil from "@/core/global/CopyUtil";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";

@Component
export default class PageLossCommission extends AbstractView {
    png_img1 = png_img1;

    LangUtil = LangUtil;
    CopyUtil = CopyUtil;
    amountFormat = amountFormat;
    CoinTransformHelper = CoinTransformHelper;
    GamePlatConfig = GamePlatConfig;
    core = core;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: PageLossCommissionProxy = this.getProxy(PageLossCommissionProxy);
    pageData = this.myProxy.pageData;
    commissionDetail = this.pageData.commissionDetail;
    mainCoin = GamePlatConfig.getMainCoin();

    constructor() {
        super(PageLossCommissionMediator);
    }
    destroyed() {
        super.destroyed();
    }

    mounted() {
        PanelUtil.showAppLoading(false);
    }

    @Watch("core.user_id")
    onWatchUserId() {
        this.myProxy.api_user_var_direct_commission_detail();
        this.myProxy.api_user_var_short_chain();
    }

    get coinSymbol() {
        return GamePlatConfig.getcoin_symbol(GamePlatConfig.getMainCoin());
    }

    get imgInfo() {
        const isEn = this.core.lang.substring(0, 2) != "zh";
        if (this.$mobile) {
            return isEn ? png_en_infoMobile : png_infoMobile;
        } else {
            return isEn ? png_en_infoPC : png_infoPC;
        }
    }

    onCopy(value: string) {
        CopyUtil(value);
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    async showPreview() {
        if (this.pageData.promotion_qrCode) {
            const myCanvas = new MyCanvas(288, 288);
            await myCanvas.drawQrCode(this.pageData.promotion_link, 16, 16, 256, 256);

            PanelUtil.openpanel_preview(myCanvas.getData());
        }
    }

    async savePhoto() {
        if (this.pageData.promotion_qrCode) {
            const bg = require(`@/assets/extension/poster.jpg`);
            let imgData: any;
            if (bg) {
                const myCanvas = new MyCanvas(750, 1334);
                await myCanvas.drawImage1(bg, 0, 0);
                await myCanvas.drawQrCode(this.pageData.promotion_link, 250, 990, 250, 250);
                //推荐人
                myCanvas.drawText(core.user_id.toString(), 390, 940, "#ffffff", 26);
                imgData = myCanvas.getData();
            } else {
                const myCanvas = new MyCanvas(288, 288);
                await myCanvas.drawQrCode(this.pageData.promotion_link, 16, 16, 256, 256);
                imgData = myCanvas.getData();
            }

            PanelUtil.openpanel_preview(imgData);
        }
    }

    reGetLink() {
        this.myProxy.api_user_var_short_chain(1);
    }

    onOpenBonusHistory() {
        const { bonusHistory } = this.pageData;
        bonusHistory.bShow = true;
        bonusHistory.listQuery.page_count = 0;
        this.myProxy.api_user_var_direct_commission_bonus_index();
    }

    onOpenPerformance() {
        const { settlement_date_start, settlement_date_end } = this.pageData.commissionDetail;
        const { performance } = this.pageData;
        performance.bShow = true;
        this.myProxy.api_user_var_direct_commission_index(settlement_date_start, settlement_date_end);
    }
}
