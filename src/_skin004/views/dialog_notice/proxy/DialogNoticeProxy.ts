import NoticeProxy from "@/proxy/NoticeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogNoticeProxy extends puremvc.Proxy {
    static NAME = "DialogNoticeProxy";
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
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

    noticeDetialInfo = <any>{};

    curindex = 0; //当前正在显示的下标

    public get noticeData(): any {
        //console.log("弹窗" , this.noticeProxy.data.listType3);
        return this.noticeProxy.data.listType3;
    }
    //添加 公告信息
    addNoticeInfo(info: any) {
        if (!this.noticeDetialInfo) {
            this.noticeDetialInfo = <any>{};
        }
        if (!info || !info.id || info.id == "") {
            return;
        }
        this.noticeDetialInfo[info.id] = info;

        this.noticeDetialInfo = JSON.parse(JSON.stringify(this.noticeDetialInfo));
        //console.log("收到公告文本" ,this.noticeDetialInfo);
    }
    //获取指定的 公告的详情信息
    getNoticeInfo(id: number) {
        if (!this.noticeDetialInfo) {
            this.noticeDetialInfo = <any>{};
        }
        //console.log("当前" ,this.noticeDetialInfo[id]);
        return this.noticeDetialInfo[id];
    }
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
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
    }
    api_plat_var_notice_show(noticeid: any = null) {
        this.sendNotification(net.HttpType.api_plat_var_notice_show_var, { plat_id: core.plat_id, id: noticeid });
    }
}
