import { objectRemoveNull } from "@/core/global/Functions";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import dialog_message_box from "@/views/dialog_message_box";
export default class DialogDirectlySettingProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlySettingProxy";
    isOpenWalletMenu: boolean = false;
    playerInfo = {
        user_id: 0,
        nick_name: "",
        plat_id: "",
        status: "98",
        credit_rate: 0, //当前占比
        show_credit_set: 98, //是否显示多层
        parent_credit_rate: 0, //当前直属上级信用占比
        remark: "",
        username: "",
        gold_info: <any>{},
        vendor_type_switch: <any>{}, //游戏类型总开关
        invite_user_id: 0, //上级id
    };
    formData = {
        coin_name_unique: "",
    };
    limit = {
        enable_all: 0, // 是否显示注册直属、设置信用占比、加款、扣款、设置流水、设置盘口 0-不能|1-能
        enable_credit_rate: 0, // 是否显示设置信用占比 0-不能|1-能
    };
    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
        Object.assign(this.limit, {
            enable_all: 0, // 是否显示注册直属、设置信用占比、加款、扣款、设置流水、设置盘口 0-不能|1-能
            enable_credit_rate: 0, // 是否显示设置信用占比 0-不能|1-能
        });
        Object.assign(this.formData, {
            coin_name_unique: "",
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.playerInfo, data);
        const coinKeys = Object.keys(this.playerInfo.gold_info);
        if (!this.formData.coin_name_unique) this.formData.coin_name_unique = coinKeys[0];
    }
    setLimitinfo(data: any) {
        Object.assign(this.limit, data);
    }
    //查询 当前直属用户的 信息
    api_user_var_fetch_direct_user_info(direct_user_id: any) {
        this.pageData.loading = true;
        const data = {
            user_id: core.user_id,
            direct_user_id: direct_user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_fetch_direct_user_info, objectRemoveNull(data));
    }

    agent_direct_user_update() {
        this.pageData.loading = true;
        const formData = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
            account_status: this.playerInfo.status,
        };
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));
    }
    agent_direct_user_update_duoceng() {
        this.pageData.loading = true;
        const formData = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
            show_credit_set: this.playerInfo.show_credit_set,
        };
        console.log("发送修改 是否显示多层用户", formData);
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));
    }
    //清除所有的币种的余额
    api_user_var_agent_direct_deduction_all()
    {
        this.pageData.loading = true;
        const formData = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_agent_direct_deduction_all, objectRemoveNull(formData));
    }
    api_user_var_agent_direct_deduction_all_callback(msg:any = null)
    {
        this.pageData.loading = false;
        console.log("清空 回调信息",msg);

        const showmsg = [LangUtil("资产清空成功，归还资产:")];

        const keys = Object.keys(msg);
        for (let index = 0; index < keys.length; index++) {
            const element = msg[keys[index]];
            showmsg.push(LangUtil("币种:{0}  金额:{1}",element.coin_name_unique ,element.actual_deduction_gold) )
        }


        // const showmsg = {
        //     1: LangUtil("“资产清空成功，归还资产:"),
        //     2: LangUtil("{0}") + ":" ,
        //     3: LangUtil("密码") + ":" ,
        // }
        //const str = LangUtil("添加用户成功！用户名:{0} 密码:{1}",this.pageData.form.username,this.pageData.form.password)
        dialog_message_box.alert_mult({
            message: showmsg, okFun: () => {
                //this.pageData.bShow = false;
            }
        });
        
    }
    copyId(msg: any) {
        //CopyUtil(this.playerInfo.user_id.toString());
        CopyUtil(msg.toString());
        dialog_message.info(LangUtil("复制成功"));
    }
}
