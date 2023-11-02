import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogDirectlyAdduserProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyAdduserProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        form: {
            user_id: core.user_id,
            uuid: core.device,
            username: "",
            password: "",
            verify_code: "",
            show_credit_set: 1,
            register_type: 1, //1：用户名 2：邮箱 4：手机
            remark: "",
            credit_rate: 0,
            credit_rate_invited: 0,
        },
        auth_image: "",
        areaCode: <any>[],
    };
    formData = {
        user_id: core.user_id,
        direct_user_id: 0,
        inputrate: "",
    };
    inputWaterData = <any>{};
    playerInfo = {
        user_id: 0,
        nick_name: "",
        credit_rate: 0, //当前占比
        parent_credit_rate: "", //当前直属上级信用占比
        gold_info: <any>{},
        water_config: <any>{},
        parent_water_config: <any>{},
        credit_rate_min: 0, // 信用占比-最小
        credit_rate_max: 0, // 信用占比-最大
        credit_rate_invited: "", // 上级占比
        create_credit_user_type: <any>[],
    };
    //如果是列表，使用以下数据，否则删除
    resetForm() {
        Object.assign(this.pageData.form, {
            username: "",
            password: "",
            verify_code: "",
            register_type: 1,
            remark: "",
            show_credit_set: 1,
            credit_rate_invited: "", //我的占成
            credit_rate: "", //代理 占成
        });
        this.formData.inputrate = "";
        this.inputWaterData = <any>{};
    }

    setData(data: any = null) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        this.resetForm();
        this.pageData.bShow = true;
        //this.playerInfo.
        this.playerInfo.credit_rate = data.credit_rate;

        this.playerInfo.credit_rate_min = data.credit_rate_min;
        this.playerInfo.credit_rate_max = data.credit_rate_max;
        this.playerInfo.credit_rate_invited = data.credit_rate_invited;
        Object.assign(this.playerInfo.water_config, data.water_config);

        Object.assign(this.playerInfo.create_credit_user_type, data.create_credit_user_type);
        //this.playerInfo.create_credit_user_type =[];
        this.formData.inputrate = data.credit_rate;
        this.inputWaterData = JSON.parse(JSON.stringify(data.water_config));
        //Object.assign(this.inputWaterData, data.water_config);

        // this.playerInfo.credit_rate_min = "50";
        // this.playerInfo.credit_rate_max = "80";
    }
    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
    //添加用户
    api_user_var_direct_register() {
        //let credit_rate = this.playerInfo.credit_rate;
        let credit_rate = 0;
        if (this.formData.inputrate) {
            credit_rate = parseFloat(this.formData.inputrate);
        }

        const coinKeys = Object.keys(this.playerInfo.water_config);
        const pushData = JSON.parse(JSON.stringify(this.playerInfo.water_config));

        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            if (element == "0") {
                continue;
            }
            if (this.inputWaterData[element]) {
                //有值，测用新值
                pushData[element] = parseFloat(this.inputWaterData[element]);
            } else {
                pushData[element] = 0;
            }
        }

        const obj = {
            user_id: core.user_id,
            uuid: core.device,
            username: this.pageData.form.username,
            password: core.MD5.createInstance().hex_md5(this.pageData.form.password),
            verify_code: this.pageData.form.verify_code,
            remark: this.pageData.form.remark,
            show_credit_set: this.pageData.form.show_credit_set,
            water_config: JSON.stringify(pushData),
            credit_rate: this.pageData.form.credit_rate_invited + "",
            credit_rate_invited: this.pageData.form.credit_rate + "",
        };
        console.log("发送的数据为", obj);
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_direct_register, obj);
    }
    //回调
    api_user_var_direct_registe_callback(msg: any = null) {
        const showmsg = {
            1: LangUtil("添加用户成功"),
            2: LangUtil("用户名") + ":" + this.pageData.form.username,
            3: LangUtil("密码") + ":" + this.pageData.form.password,
        };
        //const str = LangUtil("添加用户成功！用户名:{0} 密码:{1}",this.pageData.form.username,this.pageData.form.password)
        PanelUtil.message_alert_mult({
            message: showmsg,
            okFun: () => {
                this.pageData.bShow = false;
                MultDialogManager.onClosePanel();
            },
        });
    }

    api_user_var_commission_commissiondetail() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
        }
    }
}
