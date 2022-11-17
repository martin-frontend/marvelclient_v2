import dialog_message_box from "@/views/dialog_message_box";
import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";

export default class DialogDirectlyAdduserProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyAdduserProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        form: {
            user_id:core.user_id,
            uuid:core.device,
            username: "",
            password: "",
            verify_code: "",
            show_credit_set:1,
            register_type: 1, //1：用户名 2：邮箱 4：手机
            remark:"",
        },
        auth_image: "",
        areaCode: <any>[],
    };
    
    //如果是列表，使用以下数据，否则删除
    resetForm() {
        Object.assign(this.pageData.form, {
            username: "",
            password: "",
            verify_code: "",
            register_type: 1,
            remark:"",
            show_credit_set:1,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        this.resetForm();
        this.pageData.bShow = true;
    }
    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
    //添加用户
    api_user_var_direct_register()
    {
        const obj = {
            user_id:core.user_id,
            uuid:core.device,
            username: this.pageData.form.username,
            password: core.MD5.createInstance().hex_md5(this.pageData.form.password) ,
            verify_code: this.pageData.form.verify_code,
            remark: this.pageData.form.remark,
            show_credit_set: this.pageData.form.show_credit_set,

        }
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_direct_register, objectRemoveNull(obj));
    }
    //回调
    api_user_var_direct_registe_callback(msg:any=null)
    {
        const showmsg ={
            1:LangUtil("添加用户成功"),
            2:LangUtil("用户名") + ":" + this.pageData.form.username,
            3:LangUtil("密码") + ":" + this.pageData.form.password,
        }
        //const str = LangUtil("添加用户成功！用户名:{0} 密码:{1}",this.pageData.form.username,this.pageData.form.password)
        dialog_message_box.alert_mult({message: showmsg, okFun: ()=>{
            this.pageData.bShow=false;
        }});
    }

    api_user_var_commission_commissiondetail() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
        }
    }
}
