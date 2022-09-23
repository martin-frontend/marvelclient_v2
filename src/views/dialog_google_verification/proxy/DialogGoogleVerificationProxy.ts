export default class DialogGoogleVerificationProxy extends puremvc.Proxy {
    static NAME = "DialogGoogleVerificationProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        form: {
            google_code: "",
        },
    };

    //如果是列表，使用以下数据，否则删除
    resetForm() {
        Object.assign(this.pageData.form, {
            google_code: "",
        });
    }
}
