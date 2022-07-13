import Utils from "@/core/global/Utils";
import MyCanvas from "@/core/ui/MyCanvas";
export default class DialogPreviewProxy extends puremvc.Proxy {
    static NAME = "DialogPreviewProxy";

    pageData = {
        bShow: false,
        url: "",
    };
}
