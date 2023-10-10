import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogBetFilterMediator from "../mediator/DialogBetFilterMediator";
import DialogBetFilterProxy from "../proxy/DialogBetFilterProxy";
import LangUtil from "@/core/global/LangUtil";
import DialogBetRecordProxy from "../../dialog_bet_record/proxy/DialogBetRecordProxy";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogBetFilter extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogBetFilterProxy = this.getProxy(DialogBetFilterProxy);
    betProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    firstShow = false;
    core = core;
    radiosInfo = [
        {
            name: LangUtil("团队投注"),
            value: "team",
        },
        {
            name: LangUtil("个人投注"),
            value: "single",
        },
    ];
    radios = ""; //筛选默认的选择
    constructor() {
        super(DialogBetFilterMediator);
    }
    typechange = 1;

    /**图标时间选择 */
    onTimeChange(val: any) {
        //    this.pageData.tabIndex= parseInt(val);
        //    this.onTabClick(this.pageData.tabIndex);
    }

    public get teamDirectlyInfo(): any {
        //return JSON.parse(JSON.stringify(this.myProxy.teamDirectlyInfo ));
        return this.myProxy.teamDirectlyInfo;
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
    // @Watch("radios")
    // onWatchRadioChange()
    // {
    // }
    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.clearData();
            this.typechange = 1;
            this.radios = this.radiosInfo[1].value;
            this.myProxy.api_user_var_agent_direct_list();
            //this.myProxy.api_xxx();
            this.firstShow = false;
        }
    }
    onClick(val: any) {
        //console.log("------点击确标题是的定----- ", val)
        if (val[1]) {
            if (val[0].user_id == core.user_id) {
                return;
            } else {
                if (val[0].directly_users <= 0) return;
                //需要请求下面
                if (!(val[0].childs && val[0].childs.length > 0)) {
                    //console.log("需要请求");
                    this.myProxy.api_user_var_agent_direct_list(val[0].user_id);
                }
            }
        }
    }

    onClickSure(val: any) {
        if (!val.parents) {
            val.parents = [];
            val.parents.unshift(core.user_id);
        } else if (val.parents.indexOf(core.user_id) == -1) {
            val.parents.unshift(core.user_id);
        }
        const obj = {
            user_id: val.user_id,
            is_group: this.radios == this.radiosInfo[1].value ? 1 : 2,
            parents: val.parents,
        };
        this.betProxy.refrushFilter(obj);
        this.onClose();
    }
}
