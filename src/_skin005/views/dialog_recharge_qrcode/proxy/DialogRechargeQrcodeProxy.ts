import PanelUtil from "@/_skin005/core/PanelUtil";
import Utils from "@/core/global/Utils";
import MyCanvas from "@/core/ui/MyCanvas";

export default class DialogRechargeQrcodeProxy extends puremvc.Proxy {
    static NAME = "DialogRechargeQrcodeProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        data: {
            paymethod_id: 10,
            type: 2,
            qrcode: "",
            image: "",
            order_info: {
                order_no: "",
                third_order_no: "",
                gold: "",
                coin_name_unique: "",
                subtitle: "",
                notice: "",
            },
        },
        img_url: "",
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {}

    setTestData() {
        const obj = {
            paymethod_id: 10,
            type: 2,
            qrcode: "00020101021226910014br.gov.bcb.pix2569api.developer.btgpactual.com/v1/p/v2/401b344dbd864e36a1df3ebd220541695204000053039865802BR5925ATOM CAPITAL INSTITUIAO D6012SAO PAULO SP62070503***6304CFFC",
            image: "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k8pUMam8UfGGyknFpDJVfNPDWusaD2utazysta7xw4dU/qaKqWJSmSomlaliUnlDZaqYVH6TylRxonKiMlWcVHyTyjepTBVvqEwVk8pU8YmHtdY1HtZa13hYa13jhy+r+CaVE5UTlTcqTio+UTGpfKLijYoTlTdUpooTlaniDZU3Kn5TxTc9rLWu8bDWusbDWusaP/wylTcqvqniDZWTikllqnijYlI5UfmEylQxVZxUTCpvVEwqJxVvqHyi4kTlpOITD2utazysta7xsNa6xg//mIoTlaniDZUTlaniRGWqmFROKr5JZaqYVKaKSeWNijcqJpWp4kTlROWkYlL5poe11jUe1lrXeFhrXeOHf4zKGypTxaQyVUwqU8WJyonKVHGiclIxqZxUTCpTxUnFpHKi8omKE5Wp4kRlqvibHtZa13hYa13jYa11jR9+WcVvqphUpooTlU9UTCpTxUnFpDKpTBUnFScVk8o3qUwVJypTxRsqU8VUcaIyVZyo/KaHtdY1HtZa13hYa13D/uADKn9TxaQyVXyTyhsVJyonFZ9QmSomlTcqJpWTikllqviEyhsVJyonFScqU8UnHtZa13hYa13jYa11DfuDtdYVHtZa13hYa13jYa11jYe11jUe1lrXeFhrXeNhrXWNh7XWNR7WWtd4WGtd42GtdY2HtdY1HtZa13hYa13jYa11jf8DdffXCAd+ONMAAAAASUVORK5CYII=",
            order_info: {
                order_no: "K1681552273429230000777",
                third_order_no: "60001000015294B042894397B2867C3E066",
                gold: "100",
                coin_name_unique: "BRL",
                subtitle: "巴西币的充值",
                notice: "巴西币的充值",
            },
        };

        return obj;
    }

    setData(data: any, isImg: boolean = false) {
        //data = this.setTestData();
        this.pageData.loading = false;
        Object.assign(this.pageData.data, data);
        Object.assign(this.pageData.data.order_info, data.order_info);

        // if (isImg) {
        //     this.pageData.img_url = data.image;
        // } else {
            this.showPreview(this.pageData.data.qrcode);
        // }
        //this.pageData.data = this.setTestData();
    }
    async showPreview(image: any) {
        // const imgBase64 = image;
        // this.pageData.img_url = imgBase64;

        const myCanvas = new MyCanvas(288, 288);
        await myCanvas.drawQrCode(image, 16, 16, 256, 256);
        this.pageData.img_url = myCanvas.getData();
    }
}
