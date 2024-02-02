export default class Marquee1Proxy extends puremvc.Proxy {
    static NAME = "Marquee1Proxy";

    public onRegister(): void {
        this.api_plat_var_marquee_index();
    }

    pageData = {
        text: "",
        index: -1,
        list: <any>[],
        org_list: <any>[],
    };

    public setData(data: any): void {
        this.pageData.org_list.length = 0;
        this.pageData.org_list.push(...data);
        if (data.length == 1) {
            const data1 = JSON.parse(JSON.stringify(data[0]));
            data1.content = data[0].content + " ";
            data.push(data1);
        }
        this.pageData.list = Object.freeze(data);
        if (data.length > 0) {
            this.next();
        }
    }

    next() {
        this.pageData.index++;
        if (this.pageData.index > this.pageData.list.length - 1) {
            this.pageData.index = 0;
        }
        this.pageData.text = this.pageData.list[this.pageData.index].content;
    }

    api_plat_var_marquee_index() {
        this.sendNotification(net.HttpType.api_plat_var_marquee_index, { plat_id: core.plat_id });
    }
}
