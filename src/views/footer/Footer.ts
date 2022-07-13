import AbstractView from "@/core/abstract/AbstractView";
import { getVersion } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import dialog_contract from "@/views/dialog_contract";
import dialog_service from "@/views/dialog_service";
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
    openLink(url:string){
        OpenLink(url);
    }

    getChannelID() {
        return core.channel_id;
    }
}
