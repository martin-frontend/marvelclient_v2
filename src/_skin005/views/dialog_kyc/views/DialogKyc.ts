import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogKycMediator from "../mediator/DialogKycMediator";
import DialogKycProxy from "../proxy/DialogKycProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
//@ts-ignore
import { Veriff } from "@veriff/js-sdk";
import OpenLink from "@/core/global/OpenLink";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { judgeClient } from "@/core/global/Functions";

@Component
export default class DialogKyc extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogKycProxy = this.getProxy(DialogKycProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogKycMediator);
    }

    mounted() {
        setTimeout(() => {
            const veriff = Veriff({
                // host: "https://api.veriff.me",
                // apiKey: "d8e2ae63-0907-480d-bed2-9d8598e7f3cd",
                apiKey: "8d6e4350-e980-448b-a972-d04947223701",
                parentId: "veriff-root",
                onSession: function (err: any, response: any) {
                    const url = response.verification.url + "?lang=" + core.lang.substring(0, 2);
                    //@ts-ignore
                    if (judgeClient() == "PC" || window.navigator.standalone) {
                        OpenLink(url);
                    } else {
                        const message_obj = <any>{
                            message: LangUtil("是否现在去认证?"),
                            okTxt: LangUtil("立即前往"),
                            isNeetClose: true,
                        };
                        message_obj.okFun = () => {
                            OpenLink(url);
                        };
                        PanelUtil.message_confirm(message_obj);
                    }
                },
            });
            veriff.setParams({
                person: {
                    givenName: "",
                    lastName: "",
                    idNumber: core.user_id.toString(),
                },
                vendorData: `${core.channel_id}#${core.user_id}`,
            });
            veriff.mount();
        }, 1000);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }
}
