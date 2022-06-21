import GameConfig from "@/core/config/GameConfig";
import LangUtil from "@/core/global/LangUtil";
export default class DialogRecordMineDetailProxy extends puremvc.Proxy {
    static NAME = "DialogRecordMineDetailProxy";
    LangUtil = LangUtil;

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        data: {
            title: {
                endTime: "",
                endWater: "",
                award: "",
            },
            detail: [],
        },
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };

    typeOptions(type: number) {
        const map = <any>{
            0: LangUtil("全部类型"),
            2: LangUtil("棋牌"),
            4: LangUtil("彩票"),
            8: LangUtil("捕鱼"),
            16: LangUtil("电子"),
            32: LangUtil("真人"),
            64: LangUtil("体育"),
            128: LangUtil("电竞"),
        };
        return map[type];
    }

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.data.title.award = "";
        this.pageData.data.title.endTime = data.settlement_from_date;
        this.pageData.data.title.endWater = data.total_water;
        if (data.total_backwater[Object.keys(data.total_backwater)[0]]) {
            this.pageData.data.title.award += `${Object.keys(data.total_backwater)[0]} ${data.total_backwater[Object.keys(data.total_backwater)[0]]
                }  `;
        }
        if (data.total_backwater[Object.keys(data.total_backwater)[1]]) {
            this.pageData.data.title.award += `${Object.keys(data.total_backwater)[1]} ${data.total_backwater[Object.keys(data.total_backwater)[1]]
                }  `;
        }
        this.pageData.data.detail = data.detail;
        this.pageData.loading = false;
    }
}
