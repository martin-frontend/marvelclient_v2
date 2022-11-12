export default class DialogDirectlyEasybetsetProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyEasybetsetProxy";
    isOpenWalletMenu: boolean = false;
    playerInfo = {
        user_id: 0,
        nick_name: "",
        gold_info:<any>{},
        
        state: "98"
    }
    
    formData= {
        user_id: core.user_id,
        direct_user_id:0,
        direct_nick_name:"",
        gold:"",
        coin_name_unique:"",
    }

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

        Object.assign(this.formData, {
            direct_user_id:0,
            direct_nick_name:"",
            gold:"",
            coin_name_unique:"",
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        // Object.assign(this.pageData.pageInfo, data.pageInfo);
        // this.pageData.list = data.list;
        const coinKeys = Object.keys(this.playerInfo.gold_info);
        this.formData.coin_name_unique = coinKeys[0];
    }
}
