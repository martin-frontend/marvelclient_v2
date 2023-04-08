import { objectRemoveNull } from "@/core/global/Functions";

export default class DialogBindGoogleProxy extends puremvc.Proxy {
    static NAME = "DialogBindGoogleProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        form: {
            google_code: "",
            old_google_code: "",
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetForm() {
        Object.assign(this.pageData.form, {
            google_code: "",
            old_google_code: "",
        });
    }

    api_user_bind_google_key_var() {
        this.sendNotification(
            net.HttpType.api_user_bind_google_key_var,
            objectRemoveNull({ ...this.pageData.form, user_id: core.user_id })
        );
    }
}
