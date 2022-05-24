export default class NoticeProxy extends puremvc.Proxy {
    static NAME = "NoticeProxy";

    data = {
        listAll: <core.PlatNoticeVO[]>[],
        listType1: <core.PlatNoticeVO[]>[],
        listType2: <core.PlatNoticeVO[]>[],
        listType3: <core.PlatNoticeVO[]>[],
    };

    setData(data: core.PlatNoticeVO[]) {
        for (const item of data) {
            this.data.listAll.push(item);
            if (item.type_position == 1) {
                this.data.listType1.push(item);
            }
            if (item.type_position == 2) {
                this.data.listType2.push(item);
            }
            if (item.type_position == 3) {
                this.data.listType3.push(item);
            }
        }
    }

    api_plat_var_notice_index() {
        this.sendNotification(net.HttpType.api_plat_var_notice_index, { plat_id: core.plat_id });
    }
}
