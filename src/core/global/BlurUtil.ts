export default function (blur: boolean) {
    const pageDiv = document.getElementById("page");
    if (pageDiv) {
        pageDiv.style.filter = blur ? "blur(6px)" : "none";
        if(blur){
            document.documentElement.style.overflow = "hidden";
            // document.documentElement.style.position = "fixed";
            //@ts-ignore
            document.body.scroll = "no";
        }else{
            document.documentElement.style.overflow = "scroll";
            // document.documentElement.style.position = "relative";
            //@ts-ignore
            document.body.scroll = "yes";
        }
    }
}
