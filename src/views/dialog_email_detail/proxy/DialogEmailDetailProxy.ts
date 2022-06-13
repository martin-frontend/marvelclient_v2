export default class DialogEmailDetailProxy extends puremvc.Proxy {
    static NAME = "DialogEmailDetailProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        data: <any>{},
    };

    setData(data: any) {
        this.pageData.data = data;
    }

    setReceive() {
        this.pageData.data.attachment_status = 21;
    }

    api_user_var_mail_var_receive() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_mail_var_receive, { user_id: core.user_id, id: this.pageData.data.id });
    }
}

export enum EnumRewardStatus {
    Empty = 1, //無獎勵
    UNRECEIVED = 11, //未領取
    RECEIVED = 21, // 已領取
}
