import AbstractView from "@/core/abstract/AbstractView";
import { getVersion } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import dialog_contract from "@/views/dialog_contract";
import dialog_service from "@/views/dialog_service";
import { Prop, Watch, Component } from "vue-property-decorator";
import dialog_official_mail from "@/_skin001/views/dialog_official_mail";

@Component
export default class Footer extends AbstractView {
    LangUtil = LangUtil;
    getVersion = getVersion;

    cooperationImgs = [
        require('@/_skin001/assets/cooperation/easybet.png'),
        require('@/_skin001/assets/cooperation/cfgaming.png'),
        require('@/_skin001/assets/cooperation/bbn.png'),
        require('@/_skin001/assets/cooperation/ag.png'),
        require('@/_skin001/assets/cooperation/pg.png'),
        require('@/_skin001/assets/cooperation/jdb.png'),
        // require('@/_skin001/assets/cooperation/ameba.png'),
        // require('@/_skin001/assets/cooperation/wl.png'),
        // require('@/_skin001/assets/cooperation/superblock.png'),
        // require('@/_skin001/assets/cooperation/pragmaticplay.png'),
    ]

    goService() {
        dialog_service.show();
    }
    goContact() {
        dialog_contract.show();
    }

    goTG() {
        OpenLink(LangUtil("TG链接"));
    }

    goMail() {
        dialog_official_mail.show();
    }

    getChannelID() {
        return core.channel_id;
    }
}
