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

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.playerInfo, data);

        this.inputWaterData = JSON.parse(JSON.stringify( this.playerInfo.water_config));
        
        const coinKeys = Object.keys(this.inputWaterData);
        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            this.inputWaterData[element] = ((this.inputWaterData[element] * 10000>>0) / 100)
        }
    }

    api_user_var_agent_direct_user_update()
    {
        const sendWaterData = JSON.parse(JSON.stringify( this.playerInfo.water_config));
        const coinKeys = Object.keys(this.inputWaterData);
        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            sendWaterData[element] = (((parseFloat (this.inputWaterData[element] )*100)>>0) / 10000 )
        }

        const formData= {
            user_id: core.user_id,
            direct_user_id:this.playerInfo.user_id,
            water_config:JSON.stringify(sendWaterData),
        }
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));

    }
}
