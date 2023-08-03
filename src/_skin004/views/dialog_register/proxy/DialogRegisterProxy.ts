import SkinVariable from "@/_skin004/core/SkinVariable";
import { getAuthDragValue } from "@/_skin005/core/AuthDragFun";
import GamePlatConfig from "@/core/config/GamePlatConfig";

export default class DialogRegisterProxy extends puremvc.Proxy {
    static NAME = "DialogRegisterProxy";

    public onRegister(): void {
        this.api_public_area_code();
    }

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        form: {
            invite_user_id: core.invite_user_id,
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
            register_type: 1, //1：用户名 2：邮箱 4：手机
            area_code: SkinVariable.defaultCode,
            backup_phone: "", //账号注册里面的手机号
        },
        auth_image: "",
        auth_drag_position: -1, //滑动验证滑块所在的位置
        areaCode: <any>[],
    };

    bankCardInfo = <any>{}; // 银行卡信息
    curBankInfo = {
        coin_name_unique: "",
        block_network_id: "",
        bankInfo: <any>[],
        curSelectBankInfo: <any>{}, //当前选择的银行信息
        realName: "", //用户输入的真实姓名
        cardNumber: "", //银行卡号
        coinOption: <any>{}, //币种选择的选项
    };
    /**重新设置 当前银行信息 */
    resetCurbankInfo() {
        this.curBankInfo.block_network_id = this.bankCardInfo[this.curBankInfo.coin_name_unique].block_network_id;
        this.curBankInfo.bankInfo.length = 0;
        this.curBankInfo.bankInfo.push(...this.bankCardInfo[this.curBankInfo.coin_name_unique].bank_list);
        this.curBankInfo.curSelectBankInfo = this.curBankInfo.bankInfo[0];
    }

    setAuthDrag(data: any) {
        this.pageData.loading = false;
        this.pageData.auth_drag_position = getAuthDragValue(data);
    }
    resetForm() {
        Object.assign(this.pageData.form, {
            invite_user_id: core.invite_user_id,
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
            backup_phone: "",
        });
    }
    setBankInfo(data: any) {
        console.log("收到银行卡信息", data);
        this.bankCardInfo = JSON.parse(JSON.stringify(data));
        this.curBankInfo.coinOption = <any>{};
        const keys = Object.keys(this.bankCardInfo);
        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];
            this.curBankInfo.coinOption[element] = element;
        }
        // this.curBankInfo.coin_name_unique = keys[0];
        this.curBankInfo.coin_name_unique = "VNDK";
        this.resetCurbankInfo();
    }
    show() {
        this.resetForm();
        this.pageData.bShow = true;
    }
    /**算否需要银行卡信息 */
    get isNeedBankInfo() {
        return GamePlatConfig.config.is_register_store_bank_info && GamePlatConfig.config.is_register_store_bank_info.is_open == 1;
    }
    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }

    get isDragAuth() {
        return GamePlatConfig.config.auth_types == 2;
    }

    onAuthcode_error() {
        this.pageData.form.verify_code = "";
        if (this.isDragAuth && (this.pageData.form.register_type == 1 || this.pageData.form.register_type == 32)) {
            console.log("--");
        } else this.api_public_auth_code();
    }
    /**--账号--注册*/
    api_user_register() {
        this.pageData.loading = true;
        const { invite_user_id, username, password, password_confirm, verify_code, area_code, register_type, backup_phone } =
            this.pageData.form;

        const obj = <any>{
            invite_user_id,
            username,
            password_ori: password,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            verify_code,
            uuid: core.device,
            area_code,
            register_type,
            backup_phone,
        };

        if (this.isNeedBankInfo) {
            obj.account = this.curBankInfo.cardNumber;
            obj.account_name = this.curBankInfo.realName;
            obj.bank_id = this.curBankInfo.curSelectBankInfo.bank_id;
            obj.bank = this.curBankInfo.curSelectBankInfo.bank_name;
            obj.account_bank = "-";
            obj.block_network_id = this.curBankInfo.block_network_id;
            obj.coin = this.curBankInfo.coin_name_unique;
        }
        this.sendNotification(net.HttpType.api_user_register, obj);
    }

    /**获取手机区号 */
    api_public_area_code() {
        this.sendNotification(net.HttpType.api_public_area_code);
    }
    api_public_auth_drag() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_drag, { uuid: core.device });
    }
    api_plat_var_bank_list() {
        this.sendNotification(net.HttpType.api_plat_var_bank_list, { plat_id: core.plat_id });
    }
}
