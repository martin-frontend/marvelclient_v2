import Vue from "vue";

export default class DialogEmailProxy extends puremvc.Proxy {
    static NAME = "DialogEmailProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            cate: 0,
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
            cate: 0,
            page_count: 1,
            page_size: 20,
        });
    }
    setTestData() {
        const obj = {
            payment_method: {
                is_read: "true",
                created_at: "asda",
            },
        };
        const list = <any>[];
        for (let index = 0; index < 10; index++) {
            list.push(obj);
        }
        return list;
    }
    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);

        if (window.$mobile) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCurrent >= pageCount;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
        }
        //  this.pageData.list = this.setTestData();
    }

    setDetail(data: any) {
        for (const item of this.pageData.list) {
            if (item.id == data.id) {
                Object.assign(item, data);
                item.is_read = true;
            }
        }
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_mail();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_mail();
    }

    api_user_var_mail() {
        const { pageCount, pageCurrent } = this.pageData.pageInfo;
        if (pageCurrent == 1) {
            this.pageData.list = [];
        }
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_mail, formCopy);
    }

    api_user_var_mail_var(id: number) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_mail_var, { user_id: core.user_id, id });
    }

    api_user_var_mail_var_receive(id: number) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_mail_var_receive, { user_id: core.user_id, id });
    }

    api_user_var_receiveQuick() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_receiveQuick, { user_id: core.user_id });
    }

    api_user_var_destroy_batch(ids: number[]) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_receiveQuick, { user_id: core.user_id, ids });
    }

    api_user_var_destroy_quick() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_destroy_quick, { user_id: core.user_id });
    }
}

/**邮件分类 */
export enum EnumMailCateType {
    ALL = 0,
    PLAT = 1,
    ACTIVITY = 11,
}

export enum EnumRewardStatus {
    Empty = 1, //無獎勵
    UNRECEIVED = 11, //未領取
    RECEIVED = 21, // 已領取
}
