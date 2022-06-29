export default class DialogTradePasswordProxy extends puremvc.Proxy {
    static NAME = "DialogTradePasswordProxy";

    pageData = {
        loading: false,
        bShow: false,
        form: {
            verify_code: "",
            password: "",
            password_confirm: "",
            area_code: "86",
        },
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            verify_code: "",
            password: "",
            password_confirm: "",
        });
    }

    show() {
        this.resetForm();
        this.pageData.bShow = true;
    }
}
