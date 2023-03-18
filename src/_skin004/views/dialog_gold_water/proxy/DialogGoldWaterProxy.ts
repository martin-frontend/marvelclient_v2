import Vue from "vue";
export default class DialogGoldWaterProxy extends puremvc.Proxy {
    static NAME = "DialogGoldWaterProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        // 列表是否加载完成，手机模式专用
        finished: false,
        done: <any>null,
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        console.log(" 接收到的 流水 数据为", data);
        this.pageData.loading = false;
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        const vuetify = Vue.vuetify;
        if (vuetify.framework.breakpoint.xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCount == pageCurrent;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
        }
      //  this.pageData.list = this.setTestData();
    }
    /**测试数据 */
    setTestData()
    {
        const obj={
            id:"1513808", 
            data_belong:"2_30024", 
            user_id:30000765, 
            plat_id:23423, 
            gold:"23423", 
            gold_scale:"23423", 
            coin_name_unique:"INR", 
            water:"0.00", 
            water_limit:"1111.10", 
            type:"平台赠送", 
            pass_type:0, 
            status:"未通过", 
            relation_ids:"{\"mail_id\":260496,\"award_id\":0}", 

            created_at:"2023-03-08 09:54:55", 
            updated_by:"system", 
            pdated_at:"2023-03-08 09:54:55"


        }
        const list=[];
        for (let index = 0; index < 10; index++) {
            list.push(obj);
        }
        return list;
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_gold_water_index();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_gold_water_index();
    }

    api_user_var_gold_water_index() {
        if (!core.user_id) return;

        this.pageData.loading = true;
        const obj = { user_id: core.user_id };
        //Object.assign(obj, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_gold_water_index, obj);

    }
}
