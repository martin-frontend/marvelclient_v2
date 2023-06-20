import NoticeProxy from "@/proxy/NoticeProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogNoticeProxy extends puremvc.Proxy {
    static NAME = "DialogNoticeProxy";
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
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

    api_plat_var_notice_show(noticeid: any = null) {
        PanelUtil.getProxy_noticeProxy.api_plat_var_notice_show(noticeid);
    }
}
