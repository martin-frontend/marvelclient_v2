export default class DialogGoogleSettingsProxy extends puremvc.Proxy {
    static NAME = "DialogGoogleSettingsProxy";
    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        list: {
            google_key: "",
            qr_code: "",
        },
    };

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.pageData.list, data);
    }

    api_user_var_google_key() {
        this.sendNotification(net.HttpType.api_user_var_google_key, {
            user_id: core.user_id,
        });
    }
}
