import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode, containsAllChars } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { Component, Watch } from "vue-property-decorator";
import DialogRegisterMediator from "../mediator/DialogRegisterMediator";
import DialogRegisterProxy from "../proxy/DialogRegisterProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import SkinVariable from "@/_skin005/core/SkinVariable";
import GlobalVar from "@/core/global/GlobalVar";
import LangConfig from "@/core/config/LangConfig";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class DialogRegister extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRegisterProxy = this.getProxy(DialogRegisterProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;
    core = core;
    ModulesHelper = ModulesHelper;
    getverityProxy = PanelUtil.getProxy_get_verityProxy;
    SkinVariable = SkinVariable;
    IsShow_HideRegisterInvite = ModulesHelper.IsShow_HideRegisterInvite();
    IsShow_DownRegisterInvite = ModulesHelper.IsShow_DownRegisterInvite();
    IsShow_inviteCode = ModulesHelper.IsShow_inviteCode();
    email_error_info = "";
    password_error_info = "";
    constructor() {
        super(DialogRegisterMediator);
    }
    checkbox = false;
    public get btn_width(): number {
        if (this.$mobile) {
            return 78;
        } else {
            return 90;
        }
    }
    public get btn_height(): number {
        if (this.$mobile) {
            return 30;
        } else {
            return 36;
        }
    }

    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        //console.log("点击的值 为" , val);
        this.form.register_type = parseInt(val);
        this.onTabClick(this.form.register_type);
    }

    checkUserName = checkUserName;
    checkMail = checkMail;
    checkPhone = checkPhone;

    areaCodeMenu = false;
    areaCodeSearch = "";
    areaCodeList: any = [];

    GamePlatConfig = GamePlatConfig;

    registerSort = [1, 4, 2, 8, 16, 32]; //顺序
    //private registerTypes = GamePlatConfig.config.register_types;
    private get registerTypes() {
        const list = [];
        let sort = this.registerSort;
        if (GlobalVar.skin == "skin008" || GlobalVar.skin == "skin017") {
            sort = [4, 8, 2, 1, 16, 32];
        }
        for (let index = 0; index < sort.length; index++) {
            const element = sort[index];
            if (GamePlatConfig.config.register_types.includes(element)) {
                list.push(element);
            }
        }
        return list;
    }

    get registerOption() {
        const option = GameConfig.config.registerOption || <any>{};
        return option[this.form.register_type];
    }
    tempSelectCode = null;

    public get areaCodeArr(): any {
        return this.myProxy.pageData.areaCode;
    }

    public get curShowCode(): string {
        return "+" + this.form.area_code;
    }

    get phoneLength() {
        return GlobalVar.skin == "skin009" ? 10 : 11;
    }
    @Watch("tempSelectCode")
    onBankInfoChange() {
        console.log("区号值变化了", this.tempSelectCode);
        if (!this.tempSelectCode) return;
        //@ts-ignore
        this.form.area_code = this.tempSelectCode.area_code;
    }

    customFilter(item: any, queryText: any, itemText: any) {
        const textOne = item.name.toLowerCase();
        const textTwo = item.area_code + "";
        const searchText = queryText.toLowerCase();

        return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    }

    hasInviteUser() {
        return !!core.invite_user_id;
    }

    mounted() {
        //console.warn(this.registerTypes);
        this.myProxy.api_public_area_code();
        this.initTips();
    }

    @Watch("pageData.areaCode")
    onWatchAreaCode() {
        this.areaCodeList = this.pageData.areaCode;
    }
    onTabClick(type: number) {
        this.pageData.form.register_type = type;
        this.myProxy.resetForm();
        this.areaCodeMenu = false;
    }

    getImageVerity() {
        this.myProxy.api_public_auth_code();
    }

    onAreaCodeInput() {
        if (this.areaCodeSearch == "") {
            this.areaCodeList = this.pageData.areaCode;
        } else {
            this.areaCodeList = [];
            for (const item of this.pageData.areaCode) {
                if (item.name.indexOf(this.areaCodeSearch) != -1 || item.area_code == this.areaCodeSearch) {
                    this.areaCodeList.push(item);
                }
            }
        }
        console.log("this.areaCodeList: ", this.areaCodeList);
    }
    onItemAreaCode(item: any) {
        this.pageData.form.area_code = item.area_code;
        this.areaCodeMenu = false;
    }
    checkBrlPhone(str: string) {
        const Regx = /^[1-9]\d{10}$/; // 电话  11位 非0 开头的纯数字
        return Regx.test(str);
    }
    get isCheck(): boolean {
        if (ModulesHelper.IsShow_register18yearsOld() && !this.checkbox) {
            return false;
        }
        const { username, password, password_confirm, verify_code, register_type, mobile_username, email_username, birth_date } = this.form;
        if (!this.chickYears()) {
            return false;
        }
        if (GameConfig.config.register_regex == 2) {
            if (!containsAllChars(password)) {
                return false;
            }
        }
        if (!this.isDragAuth && !checkVerifyVode(verify_code)) {
            return false;
        }
        return (
            password == password_confirm &&
            ((register_type == 1 && checkUserName(username)) ||
                (register_type == 32 && this.checkBrlPhone(username)) ||
                (register_type == 2 && checkMail(username)) ||
                (register_type == 4 && checkPhone(username)) ||
                (register_type == 8 && checkPhone(username) && checkUserName(mobile_username)) ||
                (register_type == 16 && checkUserName(email_username) && checkMail(username) && this.chickYears())) &&
            checkUserPassword(password)
        );
    }

    goLogin() {
        //this.pageData.bShow = false;
        this.onClose();
        PanelUtil.openpanel_login();
    }

    goService() {
        PanelUtil.openpanel_service();
    }

    // getCode() {
    //     if (this.form.register_type == 2) {
    //         dialog_get_verity.showEmailVerity(6, this.form.username);
    //     } else {
    //         dialog_get_verity.showSmsVerity(6, this.form.area_code, this.form.username);
    //     }
    // }

    get isDragAuth() {
        return GamePlatConfig.config.auth_types == 2;
    }
    onRegister() {
        if (this.isDragAuth && (this.form.register_type == 1 || this.form.register_type == 32)) {
            const that = this;
            const successFun = function (val: any) {
                that.myProxy.pageData.form.verify_code = val;
                that.myProxy.api_user_register();
            };
            const failFun = function () {
                that.myProxy.api_public_auth_drag();
            };
            that.myProxy.api_public_auth_drag();
            PanelUtil.openpanel_speed_verification(successFun, failFun, this.myProxy.pageData.auth_drag_position);
            return;
        }

        if (ModulesHelper.isNeed_registerVerifiy())
            PanelUtil.openpanel_speed_verification(() => {
                this.myProxy.api_user_register();
            });
        else this.myProxy.api_user_register();
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            if (this.isDragAuth) {
                //this.myProxy.api_public_auth_drag();
                console.log("");
            } else {
                this.myProxy.api_public_auth_code();
            }
            this.typechange = 0;
            this.onTimeChange(this.registerTypes[this.typechange]);
            //this.onTabClick(this.form.register_type);
        }
    }

    onUsernameBlur() {
        if (this.form.username == "") return;
        if (this.form.username.length < 4) {
            PanelUtil.message_success(LangUtil("账号小于4位，请重新输入"));
        }
    }
    onMobileUsernameBlur() {
        if (this.form.mobile_username == "") return;
        if (this.form.mobile_username.length < 4) {
            PanelUtil.message_success(LangUtil("账号小于4位，请重新输入"));
        }
    }
    initTips() {
        if (GameConfig.config.register_regex == 2) {
            this.passwordTips = [
                { title: "必须包含字母大写", state: 0, id: 0, select: /[A-Z]/ },
                { title: "必须包含字母小写", state: 0, id: 1, select: /[a-z]/ },
                { title: "必须包含数字", state: 0, id: 2, select: /\d/ },
                { title: "必须包含特殊字符", state: 0, id: 3, select: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ },
                { title: "长度6-20位", state: 0, id: 4, select: /^.{6,20}$/ },
            ];
        } else {
            this.passwordTips = [{ title: "长度6-20位", state: 0, id: 0, select: /^.{6,20}$/ }];
        }

        if (!SkinVariable.adjustPasswordConfirmTips) {
            this.passwordConfirmTips = JSON.parse(JSON.stringify(this.passwordTips));
        }
        for (let index = 0; index < this.passwordTips.length; index++) {
            this.passwordTips[index].state = 0;
        }
        this.passwordConfirmTips.push({ title: "必须与密码相同", state: 0, id: 50, select: null });
    }
    passwordTips = <any>[];
    passwordConfirmTips = <any>[];

    private _checkTips(str: string, tips: any) {
        for (let index = 0; index < tips.length; index++) {
            const element = tips[index];
            let res = false;
            if (element.id == 50) {
                res = !!this.form.password && !!this.form.password.trim() && this.form.password == this.form.password_confirm;
            } else {
                res = this.passwordTips[element.id].select.test(str);
            }
            // console.log("  当前条件 " + element.title+ " 结果",res);
            element.state = res ? 1 : 0;
        }
    }
    get passwordTipsHaveError() {
        return this.passwordTips.some((ele: any, index: any, arr: any) => {
            return ele.state == 0;
        });
    }
    get passwordConfirmTipsHaveError() {
        return this.passwordConfirmTips.some((ele: any, index: any, arr: any) => {
            return ele.state == 0;
        });
    }
    show = false;
    showConfirm = false;
    onPasswordInput() {
        this._checkTips(this.form.password, this.passwordTips);
    }
    onPasswordConfirmInput() {
        this._checkTips(this.form.password_confirm, this.passwordConfirmTips);
    }
    onPasswordConfirmFocus() {
        this.showConfirm = true;
    }
    onPasswordFocus() {
        this.show = true;
    }
    onPasswordBlur() {
        this.show = false;
        if (this.form.password == "") return;
        if (GameConfig.config.register_regex == 2) {
            if (!checkUserPassword(this.form.password)) {
                this.password_error_info = LangUtil("密码太短");
                return;
            }

            if (!containsAllChars(this.form.password)) {
                this.password_error_info = LangUtil("用户密码必须是6-20位字母、数字、特殊字符");
                return;
            }
        } else {
            if (!checkUserPassword(this.form.password)) {
                // PanelUtil.message_success(LangUtil("密码太短"));
                this.password_error_info = LangUtil("密码太短");
                return;
            }
        }
        this.password_error_info = "";
    }

    onPasswordConfirmBlur() {
        this.showConfirm = false;
        if (this.form.password_confirm == "") return;

        if (GameConfig.config.register_regex == 2) {
            if (!checkUserPassword(this.form.password_confirm)) {
                this.password_error_info = LangUtil("密码太短");
                return;
            }

            if (!containsAllChars(this.form.password_confirm)) {
                this.password_error_info = LangUtil("用户密码必须是6-20位字母、数字、特殊字符");
                return;
            }
        }

        if (!checkUserPassword(this.form.password)) {
            // PanelUtil.message_success(LangUtil("密码太短"));
            this.password_error_info = LangUtil("密码太短");
            return;
        }
        if (this.form.password !== this.form.password_confirm) {
            // PanelUtil.message_success(LangUtil("密码不一致"));
            this.password_error_info = LangUtil("密码不一致");
            return;
        }
        this.password_error_info = "";
    }
    public get verityString(): string {
        if (this.getverityProxy.pageData.downcount > 0) {
            return this.getverityProxy.pageData.downcount + "";
        } else {
            return LangUtil("获取验证码");
        }
    }

    public get isdeisable(): boolean {
        if (!this.getverityProxy || !this.getverityProxy.pageData || !this.getverityProxy.pageData.downcount) return false;

        console.log(" 获取验证码 中的数据", this.getverityProxy.pageData.downcount);
        return this.getverityProxy.pageData.downcount > 0;
    }
    //发送 手机验证码
    sendVerithMobile() {
        const obj = {
            category: 1,
            type: 6,
            area_code: this.form.area_code,
            mobile: this.form.username,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    //发送 邮件 验证码
    sendVerithMail() {
        const obj = {
            category: 0,
            type: 6,
            email: this.form.username,
        };
        PanelUtil.openpanel_get_verity(obj);
    }
    onBlurInput() {
        this.form.username = this.form.username.trim();
        if (!this.form.username || this.form.username == "") {
            this.email_error_info = "";
            return;
        }
        let errstr = "";
        if (!checkMail(this.form.username)) {
            errstr = LangUtil("邮箱格式不正确");
        }
        this.email_error_info = errstr;
        if (errstr) {
            console.log("错误信息", errstr);
            return errstr;
        }
        return "";
    }
    @Watch("form.register_type")
    ontypechange() {
        this.email_error_info = "";
        this.password_error_info = "";
        this.birthday_error_info = "";
        this.checkbox = false;

        for (let index = 0; index < this.passwordTips.length; index++) {
            const element = this.passwordTips[index];
            element.state = 0;
        }
        for (let index = 0; index < this.passwordConfirmTips.length; index++) {
            const element = this.passwordConfirmTips[index];
            element.state = 0;
        }
    }

    @Watch("date_menu")
    onDateMenuChange(val: boolean) {
        val && setTimeout(() => (this.activePicker = "YEAR"));
    }

    date_menu = false;
    activePicker = "";
    save_date(date: any) {
        console.log("--设置日期", date);
        if (this.$refs.menu) {
            //@ts-ignore
            this.$refs.menu.save(date);
        }

        if (this.isOver18YearsOld(date)) {
            console.log("--- 已经超过 18");
            this.birthday_error_info = "";
        } else {
            this.birthday_error_info = this.LangUtil("未满18岁不能注册");
        }
    }
    birthday_error_info = "";
    get localLang() {
        const aaaa = core.lang.substring(0, 2);
        console.log("---s", aaaa);
        return aaaa;
    }
    get isNeedBirthday() {
        if (GameConfig.config.is_need_birthday && GameConfig.config.is_need_birthday == 1) {
            return true;
        }
        return false;
        // return GlobalVar.skin == "skin008" || GlobalVar.skin == "skin011";
    }
    isOver18YearsOld(time: string): boolean {
        const dateOfBirth = new Date(time);
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--; // 如果生日还没过，则减去一岁
        }

        return age >= 18;
    }
    chickYears(): boolean {
        if (!this.isNeedBirthday) return true;

        // if (!this.form.birth_date || !this.form.birth_date.trim()) {
        //     return false;
        // }
        const { year, month, day } = this.myProxy.dateObj;
        if (!year || !year.trim() || !month || !month.trim() || !day || !day.trim()) {
            return false;
        }
        this.myProxy.pageData.form.birth_date =
            this.myProxy.dateObj.year + "-" + this.myProxy.dateObj.month + "-" + this.myProxy.dateObj.day;

        const isCan = this.isOver18YearsOld(this.form.birth_date);
        if (isCan) {
            this.birthday_error_info = "";
        } else {
            this.birthday_error_info = this.LangUtil("未满18岁不能注册");
        }
        return isCan;
    }

    onBtnDateUp(type: string) {
        this._dateChange(type, 1);
        this.onBirthdateInput();
    }

    onBtnDateDown(type: string) {
        this._dateChange(type, -1);
        this.onBirthdateInput();
    }
    _dateChange(type: string, offset: number) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        console.log("year" + year + "month" + month + "day" + day);
        if (type == "year") {
            if (!this.myProxy.dateObj.year || !this.myProxy.dateObj.year.trim()) {
                if (offset < 0) this.myProxy.dateObj.year = "1900";
                else {
                    this.myProxy.dateObj.year = year + "";
                }
                return;
            }
            const newdata = new Date(this.myProxy.dateObj.year + "-" + this.myProxy.dateObj.month + "-" + this.myProxy.dateObj.day);
            if (newdata && newdata.toString() != "Invalid Date") {
                newdata.setFullYear(newdata.getFullYear() + offset);
                this.setDateValue(newdata);
                return;
            }
            const nub = parseInt(this.myProxy.dateObj.year);
            this.myProxy.dateObj.year = nub + offset + "";
        } else if (type == "month") {
            if (!this.myProxy.dateObj.month || !this.myProxy.dateObj.month.trim()) {
                if (offset < 0) this.myProxy.dateObj.month = "12";
                else {
                    this.myProxy.dateObj.month = month + "";
                }
                return;
            }
            const newdata = new Date(this.myProxy.dateObj.year + "-" + this.myProxy.dateObj.month + "-" + this.myProxy.dateObj.day);
            if (newdata && newdata.toString() != "Invalid Date") {
                newdata.setMonth(newdata.getMonth() + offset);
                this.setDateValue(newdata);
                return;
            }

            const nub = parseInt(this.myProxy.dateObj.month);
            this.myProxy.dateObj.month = nub + offset + "";
        } else if (type == "day") {
            if (!this.myProxy.dateObj.day || !this.myProxy.dateObj.day.trim()) {
                if (offset < 0) this.myProxy.dateObj.day = "30";
                else {
                    this.myProxy.dateObj.day = day + "";
                }
                return;
            }
            const newdata = new Date(this.myProxy.dateObj.year + "-" + this.myProxy.dateObj.month + "-" + this.myProxy.dateObj.day);
            if (newdata && newdata.toString() != "Invalid Date") {
                newdata.setDate(newdata.getDate() + offset);
                this.setDateValue(newdata);
                return;
            }
            const nub = parseInt(this.myProxy.dateObj.day);
            this.myProxy.dateObj.day = nub + offset + "";
        }
    }
    setDateValue(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        this.myProxy.dateObj.year = year + "";
        this.myProxy.dateObj.month = month + "";
        this.myProxy.dateObj.day = day + "";
    }
    onBirthdateInput() {
        //console.log("输入结束");
        const today = new Date();
        const year = today.getFullYear();
        // const month = today.getMonth() + 1;
        // const day = today.getDate();
        if (this.myProxy.dateObj.year && this.myProxy.dateObj.year.trim()) {
            const curyear = parseInt(this.myProxy.dateObj.year);
            if (curyear > today.getFullYear()) {
                this.myProxy.dateObj.year = year + "";
            } else if (curyear < 1900) {
                this.myProxy.dateObj.year = "1900";
            }
        }
        if (this.myProxy.dateObj.month && this.myProxy.dateObj.month.trim()) {
            const month = parseInt(this.myProxy.dateObj.month);
            if (month > 12) {
                this.myProxy.dateObj.month = "12";
            } else if (month < 1) {
                this.myProxy.dateObj.month = "1";
            }
        }

        if (this.myProxy.dateObj.day && this.myProxy.dateObj.day.trim()) {
            const day = parseInt(this.myProxy.dateObj.day);
            if (day > 31) {
                this.myProxy.dateObj.day = "1";
            } else if (day < 1) {
                this.myProxy.dateObj.day = "1";
            }
        }
        this.chickYears();
    }

    getAreaNameClass(name: string) {
        const len = name.length;
        if (this.core.lang.startsWith("zh")) {
            return {
                nowrap: len < 11,
                "text-12": len > 7,
            };
        }
        if (this.core.lang.startsWith("en")) {
            return {
                "text-12": len > 12,
            };
        }
        return {
            "text-12": len > 10,
        };
    }
}
