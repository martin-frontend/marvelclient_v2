import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageExtensionMediator from "../mediator/PageExtensionMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import dialog_bind_invite from "@/views/dialog_bind_invite";
import dialog_directly from "@/views/dialog_directly";
import dialog_performance from "@/views/dialog_performance";
import dialog_message from "@/views/dialog_message";
import dialog_wallet from "@/views/dialog_wallet";
import dialog_message_box from "@/views/dialog_message_box";
@Component
export default class PageExtension extends AbstractView {
    myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    pageData = this.myProxy.pageData;
    promotionData = this.myProxy.promotionData;
    statistics_data = this.myProxy.statistics_data;
    tableData = this.myProxy.tableData;
    questionData = this.myProxy.questionData;

    private QRCode = QRCode;

    constructor() {
        super(PageExtensionMediator);
    }

    destroyed() {
        super.destroyed();
        this.myProxy.link = "";
    }

    @Watch("myProxy.link")
    private onWatchLink() {
        const div = this.$refs.qrcode;
        // @ts-ignore
        new this.QRCode(div, this.myProxy.link);
    }

    handlerBind() {
        dialog_bind_invite.show();
    }

    handlerDirectly() {
        dialog_directly.show();
    }

    handlerPerformance() {
        dialog_performance.show();
    }

    handleRecords() {
        // 开启弹窗: 平台钱包/账户明细/推广返佣
        dialog_wallet.show(2, 15);
    }

    /**领取奖励 */
    handlerAward() {
        dialog_message_box.confirm({
            message: "确定要领取?",
            okFun: () => {
                this.myProxy.api_user_var_commission_receive();
            },
        });
    }

    savePhoto() {
        this.myProxy.savePoster(this.myProxy.link);
    }

    reget() {
        this.myProxy.api_user_var_short_chain();
    }

    private copy() {
        this.myProxy.copy();
        dialog_message.warn("复制成功");
    }

    private copyMyId() {
        this.myProxy.copyId();
        dialog_message.warn("复制成功");
    }
}
