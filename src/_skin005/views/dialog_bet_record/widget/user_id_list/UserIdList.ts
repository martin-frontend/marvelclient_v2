import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogBetRecordProxy from "../../proxy/DialogBetRecordProxy";

@Component
export default class UserIdList extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    public get isOtherUser(): any {
        if (!this.groupsTitle) {
            //return this.curShowId;
            return "";
        } else {
            return this.listQuery.agent_user_id + "(" + this.groupsTitle + ")";
        }
    }

    public get groupsTitle(): string {
        if (this.pageData.filterBtnInfo && this.pageData.filterBtnInfo.is_group == 2) {
            return LangUtil("团队");
        } else {
            return "";
        }
    }
    public get showMultUserList(): any {
        if (!this.pageData.bShowFilterBtn) {
            return [];
        }
        return this.myProxy.pageData.filterBtnInfo.parents;
    }

    onBtnClickUserInfo(item: any) {
        //console.log("收到点击" , item);
        this.myProxy.refrushFilter({ user_id: item });
    }
}
