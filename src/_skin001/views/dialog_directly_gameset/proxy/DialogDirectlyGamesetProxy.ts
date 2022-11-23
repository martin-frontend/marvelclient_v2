import { objectRemoveNull } from "@/core/global/Functions";

export default class DialogDirectlyGamesetProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyGamesetProxy";
    isOpenWalletMenu: boolean = false;
    playerInfo = {
        user_id:0,
        nick_name:"",
        plat_id:"",
        invite_user_id:0,//上级id
        vendor_type_switch:<any>{}, // 用户游戏类型配置 产品类型:2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育电竞|128-链游   // -1-不能设置|0-否|1-是
    }
    formData= {
        coin_name_unique:"",
    }
    inputData =<any>{}
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
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.playerInfo, data);
        this.inputData = JSON.parse(JSON.stringify( this.playerInfo.vendor_type_switch));
    }

    api_user_var_agent_direct_user_update()
    {
        const sendWaterData = JSON.parse(JSON.stringify( this.playerInfo.vendor_type_switch));
        const coinKeys = Object.keys(this.inputData);
        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            //sendWaterData[element] = (((parseFloat (this.inputWaterData[element] )*100)>>0) / 10000 )
            sendWaterData[element] = parseInt (this.inputData[element] )
        }

        const formData= {
            user_id: core.user_id,
            direct_user_id:this.playerInfo.user_id,
            vendor_type_switch:JSON.stringify(sendWaterData),
        }
        //console.log("-----sendWaterData----",sendWaterData)
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, formData);
    }
    //查询 当前直属用户的 信息
    api_user_var_fetch_direct_user_info(direct_user_id:any = null) {
        this.pageData.loading = true;
        if (!direct_user_id)
        {
            direct_user_id = core.user_id;
        }
        const data = {
            user_id: core.user_id,
            direct_user_id:direct_user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_fetch_direct_user_info, objectRemoveNull(data));
    }
}
