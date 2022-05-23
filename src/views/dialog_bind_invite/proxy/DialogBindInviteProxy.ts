export default class DialogBindInviteProxy extends puremvc.Proxy {
    static NAME = "DialogBindInviteProxy";

    pageData = {
        loading: false,
        bShow: false,
        inviteId: "",
    };

    setData(data: any) {
        this.pageData.loading = false;
    }
}
