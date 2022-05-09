export default function (blur: boolean) {
    const pageDiv = document.getElementById("page");
    if (pageDiv) {
        pageDiv.style.filter = blur ? "blur(6px)" : "none";
    }
}
