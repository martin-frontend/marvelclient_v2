export default class DialogEmptyIframeProxy extends puremvc.Proxy {
    static NAME = "DialogEmptyIframeProxy";

    pageData = {
        loading: false,
        bShow: false,
        url: "",
        title: "",
        close_time: 300,
    };
    timeHandle = 0;
    //如果是列表，使用以下数据，否则删除
    resetQuery() {}

    setData(data: { title: string; url: string; close_time: number }) {
        this.pageData.loading = false;
        this.pageData.title = data.title;
        this.pageData.url = data.url;
        this.pageData.close_time = data.close_time || 500;

        if (this.timeHandle) {
            clearTimeout(this.timeHandle);
        }
        this.timeHandle = setTimeout(() => {
            console.log("自动关闭 调用");
            this.pageData.bShow = false;
            clearTimeout(this.timeHandle);
            const item = document.getElementById("empty_iframe");
            if (item) {
                item.remove();
            }
        }, this.pageData.close_time);
    }
}
