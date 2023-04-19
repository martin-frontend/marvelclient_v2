import AbstractView from "@/core/abstract/AbstractView";
import { getVersion } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import dialog_contract from "@/views/dialog_contract";
import dialog_service from "@/_skin003/views/dialog_service";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Footer extends AbstractView {
    LangUtil = LangUtil;
    getVersion = getVersion;

    goService() {
        dialog_service.show();
    }
    goContact() {
        dialog_contract.show();
    }

    goTG() {
        OpenLink(LangUtil("TG链接"));
    }

    openLink(url: string) {
        OpenLink(url);
    }

    getChannelID() {
        return core.channel_id;
    }
    goService_2(tag: number) {
        if (tag == 1) {
            //dialog_service.show(LangUtil("AML政策标题") , LangUtil("AML政策内容"));
            OpenLink(LangUtil("white/pdf/AML_Policy.pdf"));
        } else if (tag == 2) {
            OpenLink(LangUtil("white/pdf/Privacy_Policy.pdf"));
            //dialog_service.show(LangUtil("隐私政策标题") , LangUtil("隐私政策内容"));
        } else if (tag == 3) {
            OpenLink(LangUtil("white/pdf/Responsible_Gambling.pdf"));
            //dialog_service.show(LangUtil("负责任的赌博标题") , LangUtil("负责任的赌博内容"));
        } else if (tag == 4) {
            OpenLink(LangUtil("white/pdf/Terms_and_Conditions.pdf"));
            //dialog_service.show(LangUtil("条款和条件标题") , LangUtil("条款和条件内容"));
        }
    }
}
