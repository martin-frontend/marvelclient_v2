import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogOrderMediator from "../mediator/DialogOrderMediator";
import DialogOrderProxy from "../proxy/DialogOrderProxy";
import LangUtil from "@/core/global/LangUtil";
import OrderTitleUtils from "@/core/global/OrderTitleUtils";
import { dateFormat, getDateByTimeZone } from "@/core/global/Functions";

@Component
export default class DialogOrder extends AbstractView {
    LangUtil = LangUtil;
    dateFormat = dateFormat;
    getDateByTimeZone = getDateByTimeZone;

    myProxy: DialogOrderProxy = this.getProxy(DialogOrderProxy);
    pageData = this.myProxy.pageData;

    OrderTitleUtils = OrderTitleUtils;

    constructor() {
        super(DialogOrderMediator);
    }

    // 注单状态
    statusMap = {
        0: LangUtil("确认中"), //确认中
        1: LangUtil("确认成功"), //确认成功
        3: LangUtil("已拒绝"), //拒绝
        4: LangUtil("已取消"), //拒绝
        5: LangUtil("无效"), //无效
    };
    statusMapColor = {
        0: "#FF7128", //确认中
        1: "#007E29", //确认成功
        3: "#7E0000", //拒绝
        4: "#FF2828", //取消
    };

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
