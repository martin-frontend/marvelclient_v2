export default function (offset: number) {
    document.body.scrollTop = offset;
    // firefox
    document.documentElement.scrollTop = offset;
    // safari
    const win: any = window;
    win.pageYOffset = offset;
}
