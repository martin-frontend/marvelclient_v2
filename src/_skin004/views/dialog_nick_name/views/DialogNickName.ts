import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogNickNameMediator from "../mediator/DialogNickNameMediator";
import DialogNickNameProxy from "../proxy/DialogNickNameProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message from "@/views/dialog_message";
import { convert_vi_to_en } from "@/core/global/Functions";

@Component
export default class DialogNickName extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNickNameProxy = this.getProxy(DialogNickNameProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);


    public get isLangage_vi(): boolean {
        const langT = core.lang.substring(0, 2);
        //console.log(" 语言",langT );
        if (langT == "vi") {
            return true;
        }
        return false;
    }

    public get maxTextLength(): number {
        if (this.isLangage_vi) {
            return 40;
        }
        return 12;
    }

    constructor() {
        super(DialogNickNameMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        this.myProxy.pageData.nickname = "";
    }

    get isCheckedId(): boolean {
        const { nickname } = this.pageData;
        return this.checkNickname(nickname);
    }

    private checkNickname(nickname: any) {
        return nickname.length > 0 ? true : false;
    }

    onSubmit() {
        const { nickname } = this.pageData;
        const data: any = {};

        if (this.maxTextLength >= nickname.length && nickname.length >= 1) {
            data.nick_name = nickname;

            if (this.isLangage_vi) {
                data.nick_name = convert_vi_to_en(data.nick_name);
            }
            if (Object.keys(nickname).length > 0) {
                this.pageData.loading = true;
                this.selfProxy.api_user_update_var(data);
            }
        } else {
            dialog_message.info(LangUtil("昵称为1-12位字符"));
        }
    }
}
