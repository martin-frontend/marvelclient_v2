import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin005/assets/Assets";
import { getVersion } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class Footer extends AbstractView {
    LangUtil = LangUtil;
    getVersion = getVersion;
    commonIcon = Assets.commonIcon;

    gameProxy = PanelUtil.getProxy_gameproxy;
    getChannelID() {
        return core.channel_id;
    }

    //所有厂商的数据
    public get tableMenu(): any {
        return this.gameProxy.lobbyMenuIndex;
    }

    //所有 图片的数据
    public get imgData(): any {
        const data = [];
        const keys = Object.keys(this.tableMenu)
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];

            for (let n = 0; n < element.list.length; n++) {
                const ele = element.list[n];
                if (ele.entrance_type == 1) {
                    let ishave = false;
                    for (let p = 0; p < data.length; p++) {
                        if (data[p].vendor_id == ele.vendor_id) {
                            ishave = true;
                            break;
                        }
                    }
                    if (!ishave) {
                        data.push(ele);
                    }
                }
            }

        }
        //console.log("所有厂商的数据", data);
        return data;
    }

    getIcon(item: any) {
        //return require(`@/_skin004/assets/2211.png`);
        if (!item || !item.vendor_icon) {
            return ""
        }
        return item.vendor_icon;
    }

    goService() {
        //dialog_service.show();
        PanelUtil.openpanel_service();
    }
    goContact() {
        //dialog_contract.show();
        PanelUtil.openpanel_contract();
    }
    goMail() {
        //dialog_official_mail.show();
        //PanelUtil.openpanel_mail();
        PanelUtil.openpanel_official_mail();
    }

}
