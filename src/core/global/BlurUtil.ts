import { isMobile } from "./Functions";

export default function (blur: boolean) {
    const pageDiv = document.getElementById("page");
    if (pageDiv) {
        pageDiv.style.filter = blur ? "blur(6px)" : "none";
        if (isMobile()) {
            if (blur) {
                document.documentElement.style.overflow = "hidden";
                //@ts-ignore
                document.body.scroll = "no";
            } else {
                document.documentElement.style.overflow = "scroll";
                //@ts-ignore
                document.body.scroll = "yes";
            }
        }
    }
}
