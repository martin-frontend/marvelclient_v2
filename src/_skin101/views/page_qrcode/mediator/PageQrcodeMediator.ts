import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageQrcodeProxy from "../proxy/PageQrcodeProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";

export default class PageQrcodeMediator extends AbstractMediator {
    private myProxy: PageQrcodeProxy = this.getProxy(PageQrcodeProxy);
    LangUtil = LangUtil;
    private selfProxy: SelfProxy = getProxy(SelfProxy);

    protected initViewData(): void {}
}
