import GameConfig from "@/core/config/GameConfig";
export default class DialogRecordMineDetailProxy extends puremvc.Proxy {
    static NAME = "DialogRecordMineDetailProxy";

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
            list: {
                col_1: "",
                col_1_title: "",
                col_2: "",
                col_2_title: "",
                col_3: "",
                col_3_title: "",
                col_4: "",
                col_4_title: "",
                col_5: "",
                col_5_title: "",
            },
        },
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
        console.log("详情..", data);
        this.pageData.data.title.endTime = data.settlement_from_date;
        this.pageData.data.title.endWater = data.total_water;
        this.pageData.data.title.award = `${Object.keys(data.total_backwater)[0]} ${
            data.total_backwater[Object.keys(data.total_backwater)[0]]
        }  ${Object.keys(data.total_backwater)[1]} ${data.total_backwater[Object.keys(data.total_backwater)[1]]}`;
        const detail = data.detail;
        this.pageData.data.list.col_2_title = detail[0].coin_name_unique;
        this.pageData.data.list.col_2 = (detail[0].backwater_rate * 100).toFixed(2);
        this.pageData.data.list.col_3_title = detail[0].coin_name_unique;
        this.pageData.data.list.col_3 = detail[0].water;
        this.pageData.data.list.col_4_title = detail[1].coin_name_unique;
        this.pageData.data.list.col_4 = (detail[1].backwater_rate * 100).toFixed(2);
        this.pageData.data.list.col_5_title = detail[1].coin_name_unique;
        this.pageData.data.list.col_5 = detail[1].water;

        this.pageData.loading = false;
    }
}
