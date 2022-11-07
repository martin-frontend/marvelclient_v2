import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";

export default class DialogDirectlyBackwaterProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyBackwaterProxy";
    
    playerInfo = {
        user_id: 0,
        nick_name: "",
        gold_info:<any>{},
        water_config:<any>{},
        plat_water_config:<any>{},
    }
    
    formData= {
        user_id: core.user_id,
        direct_user_id:0,
        gold:"",
        coin_name_unique:"",
    }

    inputWaterData =<any>{}

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

    getConfigName(type:any)
    {
        let str = "";
        switch (type) {
            case "2":str ="棋牌"
                break;
            case "4":str ="彩票"
                break;
            case "8":str ="捕鱼"
                break;
            case "16":str ="电子"
                break;
            case "32":str ="真人"
                break;
            case "64":str ="体育电竞"
                break;
            case "128":str ="链游"
                break;
            default:
                str = type;
                break;
        }
        return LangUtil(str)
    }
   
    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.playerInfo, data);

        this.inputWaterData = JSON.parse(JSON.stringify( this.playerInfo.water_config));
        
        const coinKeys = Object.keys(this.inputWaterData);
        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            this.inputWaterData[element] = this.inputWaterData[element] * 100
        }
    }

    api_user_var_agent_direct_user_update()
    {
        const sendWaterData = JSON.parse(JSON.stringify( this.playerInfo.water_config));
        const coinKeys = Object.keys(this.inputWaterData);
        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            sendWaterData[element] = parseFloat( this.inputWaterData[element] )/ 100
        }

        const formData= {
            user_id: core.user_id,
            direct_user_id:this.playerInfo.user_id,
            water_config:JSON.stringify(sendWaterData),
        }
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));

    }
}
